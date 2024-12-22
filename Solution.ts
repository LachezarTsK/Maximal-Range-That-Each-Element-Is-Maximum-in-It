
function maximumLengthOfRanges(input: number[]): number[] {
    const subarrayRangeWhereCurrentValueIsMax: number[] = new Array(input.length).fill(0);
    const indexOfMaxValueOnTop = new Stack();

    for (let i = 0; i < input.length; ++i) {
        while (!indexOfMaxValueOnTop.isEmpty() && input[indexOfMaxValueOnTop.peek()] < input[i]) {
            const rangeToTheRightExcludingCurrentElement = i - indexOfMaxValueOnTop.peek() - 1;
            subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.pop()] += rangeToTheRightExcludingCurrentElement;
        }

        const rangeToTheLeftIncludingCurrentElement
            = (!indexOfMaxValueOnTop.isEmpty())
                ? (i - indexOfMaxValueOnTop.peek())
                : (i + 1);

        subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement;
        indexOfMaxValueOnTop.push(i);
    }

    while (!indexOfMaxValueOnTop.isEmpty()) {
        const rangeToTheRightExcludingCurrentElement = input.length - indexOfMaxValueOnTop.peek() - 1;
        subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.pop()] += rangeToTheRightExcludingCurrentElement;
    }

    return subarrayRangeWhereCurrentValueIsMax;
};

class Stack {

    container = new Array();

    push(value: number): void {
        this.container.push(value);
    }

    pop(): number {
        if (this.isEmpty()) {
            throw new Error("Stack is empty.");
        }
        return this.container.pop();
    }

    peek(): number {
        if (this.isEmpty()) {
            throw new Error("Stack is empty.");
        }
        return this.container[this.container.length - 1];
    }

    isEmpty(): boolean {
        return this.container.length === 0;
    }
}
