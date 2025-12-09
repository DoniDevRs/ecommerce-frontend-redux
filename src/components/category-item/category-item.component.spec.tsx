import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Category from '../../types/category.type'
import CategoryItem from './category-item.component'

describe('Category Item', () => {
  it('should render category correctly', () => {
    const category: Category = {
      id: '1',
      displayName: 'Lorem Ipsum',
      imageUrl: 'image_url',
      name: 'lorem-ipsum',
      products: []
    }

    render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>
    )

    screen.getByText('Lorem Ipsum')
    screen.getByText('Explore')
    
  })
})