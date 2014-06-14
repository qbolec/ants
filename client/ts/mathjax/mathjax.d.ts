declare module MathJax{
	interface Hub{
		Queue: (item :any[]) => void; 
	}
	var Hub : Hub;
}