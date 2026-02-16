import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RawMaterialsPage from '../../pages/RawMaterialsPage'

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
    form: { code: 'RM001', name: 'Steel', stockQuantity: '50' },
    setForm: vi.fn(),
    editingId: mockEditingId,
    setEditingId: vi.fn(),
    handleChange: vi.fn(),
    resetForm: vi.fn(),
  }),
}))

describe('RawMaterialsPage', () => {

  beforeEach(() => {
    mockCreate.mockClear()
    mockUpdate.mockClear()
    mockRemove.mockClear()
    mockEditingId = null
    mockItems = []
  })

  it('renders the page title', () => {
    render(<RawMaterialsPage />)
    expect(screen.getByText('Raw Materials')).toBeInTheDocument()
  })

  it('calls create when submitting the form', async () => {
    render(<RawMaterialsPage />)

    const button = screen.getByRole('button', { name: /add raw material/i })

    await userEvent.click(button)

    expect(mockCreate).toHaveBeenCalledTimes(1)
  })

  it('calls update when editingId exists', async () => {
    mockEditingId = 1

    render(<RawMaterialsPage />)

    const button = screen.getByRole('button', { name: /update raw material/i })

    await userEvent.click(button)

    expect(mockUpdate).toHaveBeenCalledTimes(1)
  })

  it('renders raw materials from the list', () => {
    mockItems = [
      { id: 1, code: 'RM001', name: 'Steel', stockQuantity: 50 },
      { id: 2, code: 'RM002', name: 'Plastic', stockQuantity: 100 },
    ]

    render(<RawMaterialsPage />)

    expect(screen.getByText('Steel')).toBeInTheDocument()
    expect(screen.getByText('Plastic')).toBeInTheDocument()
    expect(screen.getByText(/Stock: 50/)).toBeInTheDocument()
    expect(screen.getByText(/Stock: 100/)).toBeInTheDocument()
  })
})