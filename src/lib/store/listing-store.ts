import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PreviewRecord {
  name: string
  title: string
  company: string
  email: string
  phone?: string
}

interface ListingState {
  selectedColumns: string[]
  setSelectedColumns: (columns: string[]) => void
  addColumn: (column: string) => void
  removeColumn: (column: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useListingStore = create<ListingState>()(
  persist(
    (set) => ({
      selectedColumns: ['name', 'title', 'company', 'email'],
      setSelectedColumns: (columns) => set({ selectedColumns: columns }),
      addColumn: (column) => 
        set((state) => ({
          selectedColumns: [...state.selectedColumns, column]
        })),
      removeColumn: (column) =>
        set((state) => ({
          selectedColumns: state.selectedColumns.filter((col) => col !== column)
        })),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error })
    }),
    {
      name: 'listing-storage',
    }
  )
) 