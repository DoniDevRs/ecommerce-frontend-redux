import { render, screen } from '@testing-library/react'
import Loading from './loading.component'

describe('Loading Component', () => {
    it('should show a message if there is one', () => {
        render(<Loading message="Loading data..." />)
        screen.getByText('Loading data...')
    })
})