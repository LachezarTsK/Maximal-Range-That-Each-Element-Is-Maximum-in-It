
/**
 * @param {number[]} input
 * @return {number[]}
 */
var maximumLengthOfRanges = function (input) {
    const subarrayRangeWhereCurrentValueIsMax = new Array(input.length).fill(0);
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

    /**
     * @param {number} value
     * @return {void}
     */
    push(value) {
        this.container.push(value);
    }

    /**
     * @return {number}
     */
    pop() {
        if (this.isEmpty()) {
            throw new Exception("Stack is empty.");
        }
        return this.container.pop();
    }

    /**
     * @return {number}
     */
    peek() {
        if (this.isEmpty()) {
            throw new Exception("Stack is empty.");
        }
        return this.container[this.container.length - 1];
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return this.container.length === 0;
    }
}
