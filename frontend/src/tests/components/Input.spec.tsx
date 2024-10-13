import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Input from "../../components/Input/Input";

describe('Input Component', () => {
  const mockVerifyValue = vi.fn();
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockVerifyValue.mockClear();
    mockOnChange.mockClear();
  });

  it('should render the input component', () => {
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo">Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should change the value of the input component', () => {
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo">Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    fireEvent.change(inputElement, { target: { value: 'Teste' } });
    expect(inputElement).toHaveValue('Teste');
    expect(mockOnChange).toHaveBeenCalledTimes(1); // fireEvent apenas chama uma vez
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });

  it('should show an error message if the input value is invalid', () => {
    mockVerifyValue.mockReturnValue(false);
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo" errorMessage="Erro customizado">Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    fireEvent.change(inputElement, { target: { value: 'Teste' } });
    const errorMessage = screen.getByText(/Erro customizado/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should change the outline color when input value is invalid', () => {
    mockVerifyValue.mockReturnValue(false);
    render(<Input verifyValue={mockVerifyValue} type="email" onChange={mockOnChange} placeholder="Digite algo">Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    fireEvent.change(inputElement, { target: { value: 'Teste' } });
    expect(inputElement).toHaveClass('ring-ringRedColor');

    mockVerifyValue.mockReturnValue(true);
    fireEvent.change(inputElement, { target: { value: 'valid_email@email.com' } });
    expect(inputElement).toHaveClass('ring-ringColor');
    expect(inputElement).not.toHaveClass('ring-ringRedColor');
  });

  it('should change the outline color when input is valid/invalid', () => {
    mockVerifyValue.mockReturnValue(true);
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo">Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    fireEvent.change(inputElement, { target: { value: 'Teste@hotmail.com' } });
    expect(inputElement).toHaveClass('ring-ringColor');

    mockVerifyValue.mockReturnValue(false);
    fireEvent.change(inputElement, { target: { value: 'invalid@email' } });
    expect(inputElement).toHaveClass('ring-ringRedColor');
    expect(inputElement).not.toHaveClass('ring-ringColor');
  });

  it('should disable the button when it receives the disable property', () => {
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo" disabled>Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    expect(inputElement).toBeDisabled();
  });

  it('should verify the type of the input', () => {
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo" isPassword>Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should have an eye icon when input type is password', () => {
    render(<Input verifyValue={mockVerifyValue} onChange={mockOnChange} placeholder="Digite algo" isPassword>Label</Input>);

    const inputElement = screen.getByPlaceholderText(/Digite algo/i);
    const eyeIcon = screen.getByTestId('eye-icon');
    expect(eyeIcon).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
    
    fireEvent.click(eyeIcon);
    expect(inputElement).toHaveAttribute('type', 'text');
    
    fireEvent.click(eyeIcon);
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
