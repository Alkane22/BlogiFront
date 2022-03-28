import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blogi = {
        title: 'asderssonin blog',
        author: 'pentti',
        url: 'asd.com',
        likes: 0
    }

    render(<Blog blog={blogi}/>)

    const element = screen.getByText('asderssonin blog')
    expect(element).toBeDefined()
    const element2 = screen.getByText('pentti')
    expect(element2).toBeDefined()

})

test('clicking calls event handler', async () => {
    const blogi = {
        title: 'blog2',
        author: 'smith',
        url: 'guugle.com',
        likes: 0
    }

    const mockHandler1 = jest.fn()
    const mockHandler2 = jest.fn()

    render(<Blog blog={blogi} myFunc={mockHandler1} likeFunc={mockHandler2}/>)

    const but1 = screen.getByText('Delete')
    userEvent.click(but1)

    const but2 = screen.getByText('Like')
    userEvent.click(but2)
    userEvent.click(but2)

    expect(mockHandler1.mock.calls).toHaveLength(1)
    expect(mockHandler2.mock.calls).toHaveLength(2)
})