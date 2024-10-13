import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from '../../components/SearchForm/SearchForm';


describe('SearchForm Component', () => {
  const mockSetSearch = vi.fn();
  const mockHandleSearch = vi.fn((e) => e.preventDefault());

  const setup = (search = '') => {
    render(
      <SearchForm
        search={search}
        setSearch={mockSetSearch}
        handleSearch={mockHandleSearch}
      />
    );
  };

  it('should renders the input field with the correct value', () => {
    setup('test search');
    const input = screen.getByPlaceholderText('Procurar');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test search');
  });

  it('should calls setSearch on input change', () => {
    setup();
    const input = screen.getByPlaceholderText('Procurar');
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(mockSetSearch).toHaveBeenCalledWith('new search');
  });

  it('should calls handleSearch with the correct value on form submit', () => {
    setup('');

    const inputValue = 'teste';

    const input = screen.getByPlaceholderText('Procurar');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(mockSetSearch).toHaveBeenCalledWith(inputValue);
    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith(expect.anything());
    expect(mockSetSearch).toHaveBeenCalledWith(inputValue);
  });


  it('should renders the search button', () => {
    setup();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should input field has the correct placeholder', () => {
    setup();
    const input = screen.getByPlaceholderText('Procurar');
    expect(input).toHaveAttribute('placeholder', 'Procurar');
  });

  it('should input field is initially empty', () => {
    setup();
    const input = screen.getByPlaceholderText('Procurar');
    expect(input).toHaveValue('');
  });

  it('should button has the correct type', () => {
    setup();
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should input field has the correct class', () => {
    setup();
    const input = screen.getByPlaceholderText('Procurar');
    expect(input).toHaveClass('focus:outline-none border-none text-lg bg-transparent p-3 rounded-s-xl w-full text-white');
  });

  it('should button has the correct class', () => {
    setup();
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-3 focus:outline-none border-none relative group text-white');
  });

});