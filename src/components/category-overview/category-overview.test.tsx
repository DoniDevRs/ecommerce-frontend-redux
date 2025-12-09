import { renderWithRedux } from '../helpers/test.helpers'
import Category from '../../types/category.type'
import CategoryOverview from './category-overview.component'
import { screen } from '@testing-library/react'

describe('Category Overview', () => {
  it('should show correct category and its products', () => {
    const category: Category = {
      displayName: 'Lorem Ipsum',
      id: '1',
      imageUrl: 'image_url',
      name: 'lorem-ipsum',
      products: [
        {
          id: '2',
          imageUrl: 'image_url',
          name: 'Lorem',
          price: 100
        },
        {
          id: '3',
          imageUrl: 'image_url',
          name: 'Ipsum',
          price: 200
        },
        {
          id: '4',
          imageUrl: 'image_url',
          name: 'Dolor',
          price: 300
        },
        {
          id: '5',
          imageUrl: 'image_url',
          name: 'Sit',
          price: 400
        },
        {
          id: '6',
          imageUrl: 'image_url',
          name: 'Amet',
          price: 500
        }
      ]
    }
    renderWithRedux(
      <CategoryOverview category={category} />,
      {}
    )

    screen.getByText(/lorem ipsum/i)

    screen.getByText('Lorem')
    screen.getByText('R$100')

    screen.getByText('Ipsum')
    screen.getByText('R$200')

    screen.getByText('Dolor')
    screen.getByText('R$300')

    screen.getByText('Sit')
    screen.getByText('R$400')

    expect(screen.queryByText('Amet')).toBeNull()
  })
})