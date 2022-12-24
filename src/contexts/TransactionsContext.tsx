import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

type TransactionsContextType = {
  transactions: Transaction[]
}

interface TransactionsProviderProps {
  children: ReactNode
}

const transactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <transactionsContext.Provider value={{ transactions }}>
      {children}
    </transactionsContext.Provider>
  )
}

export function useTransactions() {
  return useContext(transactionsContext)
}
