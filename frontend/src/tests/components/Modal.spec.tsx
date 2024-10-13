import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { describe, it, expect, vi } from 'vitest';
import Modal from '../../components/Modal/Modal';
import { Dispatch, SetStateAction } from 'react';

describe('Modal Component', () => {

  const setup = (isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>) => {
    render(
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
  }

  it('should render children when isOpen is true', () => {
    setup(true, () => { });

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should not render children when isOpen is false', () => {
    setup(false, () => { });

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('should call setIsOpen with false when close button is clicked', () => {
    const setIsOpen = vi.fn();
    setup(true, setIsOpen);

    fireEvent.click(screen.getByRole('button'));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it('should have correct styles when isOpen is true', () => {
    setup(true, () => { });

    const modal = screen.getByTestId('modal-content').parentElement?.parentElement;
    expect(modal).toHaveClass('fixed top-0 left-0 w-full h-full z-50 backdrop-blur-sm');
  });
});