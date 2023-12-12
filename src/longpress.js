// Longpress.js

export function longpress(node, duration) {
	let timer;
	
	const handleMousedown = () => {
		timer = setTimeout(() => {
			node.dispatchEvent(
				new CustomEvent('longpress')
			);
		}, duration);
	};
	
	const handleMouseup = () => {
		clearTimeout(timer)
	};

	node.addEventListener('touchstart', handleMousedown);
	node.addEventListener('mousedown', handleMousedown);
	node.addEventListener('mouseup', handleMouseup);
	node.addEventListener('touchend', handleMouseup);

	return {
		update(newDuration) {
			duration = newDuration;
		},
		destroy() {
		node.removeEventListener('touchstart', handleMousedown);
		node.removeEventListener('mousedown', handleMousedown);
		node.removeEventListener('mouseup', handleMouseup);
		node.removeEventListener('touchend', handleMouseup);
		}
	};
}