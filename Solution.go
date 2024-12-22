
package main

import (
    "errors"
    "fmt"
)

func maximumLengthOfRanges(input []int) []int {
    subarrayRangeWhereCurrentValueIsMax := make([]int, len(input))
    indexOfMaxValueOnTop := NewStack()

    for i := range input {
        for !indexOfMaxValueOnTop.isEmpty() {
            indexOnTop, _ := indexOfMaxValueOnTop.Peek()
            if input[indexOnTop] > input[i] {
                break
            }

            rangeToTheRightExcludingCurrentElement := i - indexOnTop - 1
            subarrayRangeWhereCurrentValueIsMax[indexOnTop] += rangeToTheRightExcludingCurrentElement
            indexOfMaxValueOnTop.Pop()
        }

        var rangeToTheLeftIncludingCurrentElement int
        if !indexOfMaxValueOnTop.isEmpty() {
            indexOnTop, _ := indexOfMaxValueOnTop.Peek()
            rangeToTheLeftIncludingCurrentElement = (i - indexOnTop)
        } else {
            rangeToTheLeftIncludingCurrentElement = i + 1
        }

        subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement
        indexOfMaxValueOnTop.Push(i)
    }

    for !indexOfMaxValueOnTop.isEmpty() {
        indexOnTop, _ := indexOfMaxValueOnTop.Pop()
        rangeToTheRightExcludingCurrentElement := len(input) - indexOnTop - 1
        subarrayRangeWhereCurrentValueIsMax[indexOnTop] += rangeToTheRightExcludingCurrentElement
    }

    return subarrayRangeWhereCurrentValueIsMax
}

type Stack struct {
    container []int
}

func NewStack() Stack {
    return Stack{container: make([]int, 0)}
}

func (this *Stack) Push(value int) {
    this.container = append(this.container, value)
}

func (this *Stack) Pop() (int, error) {
    if this.isEmpty() {
        return 0, errors.New("Stack is empty.")
    }
    value := this.container[len(this.container) - 1]
    this.container = this.container[0 : len(this.container) - 1]
    return value, nil
}

func (this *Stack) Peek() (int, error) {
    if this.isEmpty() {
        return 0, errors.New("Stack is empty.")
    }
    return this.container[len(this.container) - 1], nil
}

func (this *Stack) isEmpty() bool {
    return len(this.container) == 0
}
