
import { renderWithRedux } from '../helpers/test.helpers'
import { screen } from '@testing-library/react'
import Cart from './cart.component'

describe('Cart', () => {
  it('should show correct cart products', () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              imageUrl: 'image_url',
              name: 'Hat',
              price: 100,
              quantity: 2
            }
          ]
        }
      } as any
    })

    screen.getByText(/hat/i)
    screen.getByText('R$100')
    screen.getByText('2')
    screen.getByText('Total: R$200')
    screen.getByText(/proceed to checkout/i)
  })

})