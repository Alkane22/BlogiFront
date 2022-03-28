import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<BlogForm/> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog}/>)

    const inputs = screen.getAllByRole('textbox')
    const btn = screen.getByText('Add')

    userEvent.type(inputs[0], 'Test Title')
    userEvent.type(inputs[1], 'Alpha Author')
    userEvent.type(inputs[2], 'URL.com')
    userEvent.click(btn)

    //screen.debug()

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Alpha Author')
    expect(createBlog.mock.calls[0][0].url).toBe('URL.com')
})