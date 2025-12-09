import { renderWithRedux } from '../helpers/test.helpers'
import { screen } from '@testing-library/react'
import Checkout from './checkout.component'

describe('Checkout', () => {
  it('should show correct products and total price', () => {
    renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '2',
              imageUrl: 'image_url',
              name: 'Lorem',
              price: 100,
              quantity: 1
            },
            {
              id: '3',
              imageUrl: 'image_url',
              name: 'Ipsum',
              price: 200,
              quantity: 1
            },
            {
              id: '4',
              imageUrl: 'image_url',
              name: 'Dolor',
              price: 300,
              quantity: 1
            }
          ]
        }
      } as any
    })

    screen.getByText('Total: R$600')
    screen.getByText(/complete purchase/i)
    screen.getByText(/checkout/i)
  })

  it('should show empty message if cart is empty and not show checkout button', () => {
    renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: {
          products: []
        }
      } as any
    })

    screen.getByText(/your cart is empty!/i)
    expect(screen.queryByText(/complete purchase/i)).toBeNull()
  })
})