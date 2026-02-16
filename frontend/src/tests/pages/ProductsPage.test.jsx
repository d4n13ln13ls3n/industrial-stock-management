import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductsPage from '../../pages/ProductsPage'

let mockEditingId = null
let mockItems = []

const mockCreate = vi.fn()
const mockUpdate = vi.fn()
const mockRemove = vi.fn()

vi.mock('../../hooks/useCrud', () => ({
  useCrud: () => ({
    items: mockItems,
    loading: false,
    create: mockCreate,
    update: mockUpdate,
    remove: mockRemove,
  }),
}))

vi.mock('../../hooks/useForm', () => ({
  useForm: () => ({
    form: { code: 'P001', name: 'Test Product', price: '100' },
    setForm: vi.fn(),
    editingId: mockEditingId,
    setEditingId: vi.fn(),
    handleChange: vi.fn(),
    resetForm: vi.fn(),
  }),
}))

describe('ProductsPage', () => {

  beforeEach(() => {
    mockCreate.mockClear()
    mockUpdate.mockClear()
    mockRemove.mockClear()
    mockEditingId = null
    mockItems = []
  })

  it('renders the page title', () => {
    render(<ProductsPage />)
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('calls create when submitting the form', async () => {
    render(<ProductsPage />)

    const button = screen.getByRole('button', { name: /add product/i })

    await userEvent.click(button)

    expect(mockCreate).toHaveBeenCalledTimes(1)
  })

  it('calls update when editingId exists', async () => {
    mockEditingId = 1

    render(<ProductsPage />)

    const button = screen.getByRole('button', { name: /update product/i })

    await userEvent.click(button)

    expect(mockUpdate).toHaveBeenCalledTimes(1)
  })

  it('renders products from the list', () => {
    mockItems = [
      { id: 1, code: 'P001', name: 'Product A', price: 100 },
      { id: 2, code: 'P002', name: 'Product B', price: 200 },
    ]

    render(<ProductsPage />)

    expect(screen.getByText('Product A')).toBeInTheDocument()
    expect(screen.getByText('Product B')).toBeInTheDocument()

    expect(screen.getByText('\$100.00')).toBeInTheDocument()
    expect(screen.getByText('\$200.00')).toBeInTheDocument()
  })
})