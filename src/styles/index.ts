export const gs = {
    centerCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    } as const,
    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    } as const,
    largeButton: {
		margin: '10px',
		padding: '10px',
		border: '1px solid black',
		cursor: 'pointer',
		fontSize: '16px',
		borderRadius: '5px',
	} as const,
} as const
