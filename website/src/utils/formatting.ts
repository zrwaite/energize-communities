export const formatNumber = (num: number) => {
	const roundedNum = Math.round(num)
	return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}