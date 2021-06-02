import TextIcon from '../TextIcon';
import { getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('TextIcon', () => {
  const props = {
    icon: 'some icon',
    text: 'some text',
    alt: 'some description',
  };

  it('should render TextIcon component properly', () => {
    const { getByText } = render(<TextIcon {...props} />);
    expect(getByText('some text')).toBeInTheDocument();
  });
});
