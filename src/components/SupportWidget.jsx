import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, X, Copy, Check, Wallet, ExternalLink } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────
// 1. PUT YOUR REAL ADDRESSES HERE. Nothing will work until you do.
//
//    EVM_ADDRESS: your MetaMask 0x... address. MetaMask uses ONE address
//    for every EVM chain, so this single address is used for Ethereum,
//    Base, Linea, Polygon and BNB Chain — MetaMask just switches networks
//    under the hood.
//
//    BTC_ADDRESS / SOL_ADDRESS: Bitcoin and Solana are NOT EVM chains, so
//    MetaMask can't hold or send them in the normal desktop/browser
//    extension. Get these addresses from a real BTC wallet (e.g. a
//    hardware wallet, Electrum, Exodus) and a real SOL wallet (e.g.
//    Phantom, Solflare) — visitors just scan/copy them, no "connect" step.
// ─────────────────────────────────────────────────────────────────────────
const EVM_ADDRESS = "0x3eF81555F0D01381293ad9eDa9e9c048a4638df5"
const BTC_ADDRESS = "bc1qv7kfrzeewwd7xpzf8hk8wc9t2mwy0sqajvn0pp"
const SOL_ADDRESS = "BgYBDSE67fWYJtDenrs948cxnbH3fQGPZbQQxDTZPfhP"
const TRON_ADDRESS = "TEgoTmQXXXsj5XtYHGKcd79AcDf518bvfM"

const EVM_CHAINS = [
  {
    key: "ethereum",
    label: "Ethereum",
    symbol: "ETH",
    chainIdHex: "0x1",
    explorer: "https://etherscan.io/tx/",
    presets: [0.001, 0.003, 0.01],
    addParams: null, // mainnet is always present in MetaMask, no need to add it
  },
  {
    key: "base",
    label: "Base",
    symbol: "ETH",
    chainIdHex: "0x2105",
    explorer: "https://basescan.org/tx/",
    presets: [0.001, 0.003, 0.01],
    addParams: {
      chainId: "0x2105",
      chainName: "Base",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"],
    },
  },
  {
    key: "linea",
    label: "Linea",
    symbol: "ETH",
    chainIdHex: "0xe708",
    explorer: "https://lineascan.build/tx/",
    presets: [0.001, 0.003, 0.01],
    addParams: {
      chainId: "0xe708",
      chainName: "Linea",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://rpc.linea.build"],
      blockExplorerUrls: ["https://lineascan.build"],
    },
  },
  {
    key: "polygon",
    label: "Polygon",
    symbol: "POL",
    chainIdHex: "0x89",
    explorer: "https://polygonscan.com/tx/",
    presets: [1, 3, 10],
    addParams: {
      chainId: "0x89",
      chainName: "Polygon",
      nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  },
  {
    key: "bnb",
    label: "BNB Chain",
    symbol: "BNB",
    chainIdHex: "0x38",
    explorer: "https://bscscan.com/tx/",
    presets: [0.003, 0.01, 0.03],
    addParams: {
      chainId: "0x38",
      chainName: "BNB Smart Chain",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      rpcUrls: ["https://bsc-dataseed.binance.org"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  },
]

const NON_EVM = [
  { key: "bitcoin", label: "Bitcoin", address: BTC_ADDRESS },
  { key: "solana", label: "Solana", address: SOL_ADDRESS },
  { key: "tron", label: "Tron", address: TRON_ADDRESS },
]

// Precise decimal -> hex wei conversion (avoids float rounding errors)
function toHexWei(amount, decimals = 18) {
  const [whole, frac = ""] = String(amount).split(".")
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals)
  const wei = BigInt(whole || "0") * 10n ** BigInt(decimals) + BigInt(fracPadded || "0")
  return "0x" + wei.toString(16)
}

function short(addr) {
  if (!addr) return ""
  return addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("evm")
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [selectedChainKey, setSelectedChainKey] = useState("ethereum")
  const [amount, setAmount] = useState(null)
  const [status, setStatus] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  // lets any other part of the site (e.g. a nav/footer link) open this modal
  // via: window.dispatchEvent(new Event("open-support-widget"))
  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener("open-support-widget", handleOpen)
    return () => window.removeEventListener("open-support-widget", handleOpen)
  }, [])

  useEffect(() => {
    if (!window.ethereum) return
    window.ethereum.request({ method: "eth_chainId" }).then(setChainId).catch(() => {})
    window.ethereum.request({ method: "eth_accounts" }).then((accs) => {
      if (accs?.[0]) setAccount(accs[0])
    }).catch(() => {})

    const onAccounts = (accs) => setAccount(accs[0] || null)
    const onChain = (id) => setChainId(id)
    window.ethereum.on?.("accountsChanged", onAccounts)
    window.ethereum.on?.("chainChanged", onChain)
    return () => {
      window.ethereum.removeListener?.("accountsChanged", onAccounts)
      window.ethereum.removeListener?.("chainChanged", onChain)
    }
  }, [])

  const selectedChain = EVM_CHAINS.find((c) => c.key === selectedChainKey)
  const wrongNetwork = Boolean(
    account && chainId && selectedChain && chainId.toLowerCase() !== selectedChain.chainIdHex
  )

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer")
      return
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      setChainId(await window.ethereum.request({ method: "eth_chainId" }))
    } catch {
      setStatus({ type: "error", message: "Connection request was rejected." })
    }
  }, [])

  const switchNetwork = useCallback(async (chain) => {
    if (!window.ethereum) return
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain.chainIdHex }],
      })
    } catch (err) {
      if (err?.code === 4902 && chain.addParams) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chain.addParams],
          })
        } catch {
          setStatus({ type: "error", message: `Couldn't add ${chain.label} in MetaMask.` })
          return
        }
      } else {
        setStatus({ type: "error", message: `Couldn't switch to ${chain.label}.` })
        return
      }
    }
    setChainId(await window.ethereum.request({ method: "eth_chainId" }))
  }, [])

  const send = useCallback(async () => {
    if (!account || !amount || !selectedChain) return
    setStatus({ type: "pending", message: "Confirm the transaction in MetaMask…" })
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: account, to: EVM_ADDRESS, value: toHexWei(amount) }],
      })
      setStatus({ type: "success", message: "Thank you for the coffee! ☕", txHash })
    } catch (err) {
      setStatus({ type: "error", message: err?.message?.slice(0, 90) || "Transaction failed or was rejected." })
    }
  }, [account, amount, selectedChain])

  const copy = useCallback((key, text) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1500)
  }, [])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black space-mono text-[11px] tracking-widest uppercase font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
      >
        <Coffee size={16} strokeWidth={2.5} />
        Buy me a coffee
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-8 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <p className="space-mono text-[10px] tracking-[0.4em] text-white/30 uppercase mb-2">Support</p>
              <h3 className="text-2xl font-black mb-6 text-white">Buy me a coffee ☕</h3>

              <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-full">
                <button
                  onClick={() => setTab("evm")}
                  className={`flex-1 py-2 rounded-full space-mono text-[10px] tracking-widest uppercase transition-all ${
                    tab === "evm" ? "bg-white text-black" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  MetaMask (EVM)
                </button>
                <button
                  onClick={() => setTab("other")}
                  className={`flex-1 py-2 rounded-full space-mono text-[10px] tracking-widest uppercase transition-all ${
                    tab === "other" ? "bg-white text-black" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Other Networks
                </button>
              </div>

              {tab === "evm" && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {EVM_CHAINS.map((chain) => (
                      <button
                        key={chain.key}
                        onClick={() => {
                          setSelectedChainKey(chain.key)
                          setAmount(null)
                          setStatus(null)
                        }}
                        className={`px-3 py-1.5 rounded-full border space-mono text-[10px] tracking-widest uppercase transition-all ${
                          selectedChainKey === chain.key
                            ? "border-white bg-white text-black"
                            : "border-white/15 text-white/50 hover:border-white/40"
                        }`}
                      >
                        {chain.label}
                      </button>
                    ))}
                  </div>

                  {!account ? (
                    <button
                      onClick={connect}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black space-mono text-xs tracking-widest uppercase font-bold"
                    >
                      <Wallet size={14} /> Connect MetaMask
                    </button>
                  ) : (
                    <>
                      <p className="space-mono text-[10px] text-white/40 tracking-widest">
                        Connected: <span className="text-white/70">{short(account)}</span>
                      </p>

                      {wrongNetwork && (
                        <button
                          onClick={() => switchNetwork(selectedChain)}
                          className="w-full py-2.5 rounded-full border border-yellow-500/40 text-yellow-400 space-mono text-[10px] tracking-widest uppercase hover:bg-yellow-500/10"
                        >
                          Switch MetaMask to {selectedChain.label}
                        </button>
                      )}

                      <div className="flex gap-2">
                        {selectedChain.presets.map((p) => (
                          <button
                            key={p}
                            onClick={() => setAmount(p)}
                            className={`flex-1 py-2.5 rounded-xl border space-mono text-xs tracking-wider transition-all ${
                              amount === p
                                ? "border-white bg-white text-black"
                                : "border-white/15 text-white/60 hover:border-white/40"
                            }`}
                          >
                            {p} {selectedChain.symbol}
                          </button>
                        ))}
                      </div>

                      <input
                        type="number"
                        step="any"
                        min="0"
                        placeholder={`Custom amount in ${selectedChain.symbol}`}
                        value={amount ?? ""}
                        onChange={(e) => setAmount(e.target.value ? e.target.value : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40"
                      />

                      <button
                        disabled={!amount || wrongNetwork}
                        onClick={send}
                        className="w-full py-3 rounded-full bg-white text-black space-mono text-xs tracking-widest uppercase font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                      >
                        Send {amount ? `${amount} ${selectedChain.symbol}` : ""}
                      </button>
                    </>
                  )}

                  {status && (
                    <div
                      className={`text-xs space-mono rounded-xl px-4 py-3 border leading-relaxed ${
                        status.type === "success"
                          ? "border-green-500/30 text-green-400"
                          : status.type === "error"
                          ? "border-red-500/30 text-red-400"
                          : "border-white/15 text-white/50"
                      }`}
                    >
                      {status.message}
                      {status.txHash && (
                        <a
                          href={selectedChain.explorer + status.txHash}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 mt-1 underline underline-offset-2"
                        >
                          View transaction <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  )}

                  <p className="text-[10px] text-white/25 leading-relaxed">
                    One MetaMask address works across Ethereum, Base, Linea, Polygon and BNB Chain —
                    MetaMask just switches networks. Network gas fees apply and go to the network, not to me.
                  </p>
                </div>
              )}

              {tab === "other" && (
                <div className="space-y-5">
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    MetaMask doesn't natively send Bitcoin, Solana, or Tron, so scan or copy the address below
                    with an appropriate wallet (Phantom, Trust Wallet, Electrum, TronLink, etc.).
                  </p>
                  {NON_EVM.map((c) => (
                    <div key={c.key} className="border border-white/10 rounded-2xl p-5 text-center">
                      <p className="space-mono text-[10px] tracking-widest text-white/40 uppercase mb-3">
                        {c.label}
                      </p>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=10&data=${encodeURIComponent(
                          c.address
                        )}`}
                        alt={`${c.label} donation address QR code`}
                        className="mx-auto mb-3 rounded-xl bg-white p-2"
                        width={140}
                        height={140}
                        loading="lazy"
                      />
                      <button
                        onClick={() => copy(c.key, c.address)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-white/60 hover:border-white/40 space-mono text-[10px]"
                      >
                        {copiedKey === c.key ? <Check size={12} /> : <Copy size={12} />}
                        {short(c.address)}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
