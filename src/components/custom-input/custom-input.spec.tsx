import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Colors from '../../theme/theme.colors'
import CustomInput from './custom-input.component'

describe('Custom Input', () => {
  it('should render with error if hasError is true', () => {
    render(<CustomInput placeholder="lorem ipsum" hasError={true} />)
    const input = screen.getByPlaceholderText('lorem ipsum')
    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` })
  })

  it('should render without error if hasError is false', () => {
    render(<CustomInput placeholder="lorem ipsum" hasError={false} />)
    const input = screen.getByPlaceholderText('lorem ipsum')

    expect(input).toHaveStyle({ border: 'none' })
  })
})