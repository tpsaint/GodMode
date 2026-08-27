import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TitleBar } from '../renderer/TitleBar';

describe('TitleBar', () => {
	it('renders the GodMode title', () => {
		render(
			<TitleBar isAlwaysOnTop={false} toggleIsAlwaysOnTop={() => undefined} />,
		);
		expect(screen.getByText('🐣 GodMode')).toBeInTheDocument();
		expect(screen.queryByText('Pinned')).not.toBeInTheDocument();
	});

	it('shows pinned label when always on top is enabled', () => {
		render(
			<TitleBar isAlwaysOnTop={true} toggleIsAlwaysOnTop={() => undefined} />,
		);
		expect(screen.getByText('Pinned')).toBeInTheDocument();
	});

	it('calls toggle handler when pin button is clicked', () => {
		const toggleIsAlwaysOnTop = jest.fn();
		render(
			<TitleBar
				isAlwaysOnTop={true}
				toggleIsAlwaysOnTop={toggleIsAlwaysOnTop}
			/>,
		);
		fireEvent.click(screen.getByRole('button', { name: /pinned/i }));
		expect(toggleIsAlwaysOnTop).toHaveBeenCalledTimes(1);
	});
});
