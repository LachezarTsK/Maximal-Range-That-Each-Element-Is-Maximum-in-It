
using System;


public class Solution
{
    public int[] MaximumLengthOfRanges(int[] input)
    {
        int[] subarrayRangeWhereCurrentValueIsMax = new int[input.Length];
        Stack<int> indexOfMaxValueOnTop = new Stack<int>();

        for (int i = 0; i < input.Length; ++i)
        {
            while (indexOfMaxValueOnTop.Count > 0 && input[indexOfMaxValueOnTop.Peek()] < input[i])
            {
                int rangeToTheRightExcludingCurrentElement = i - indexOfMaxValueOnTop.Peek() - 1;
                subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.Pop()] += rangeToTheRightExcludingCurrentElement;
            }

            int rangeToTheLeftIncludingCurrentElement
                    = (indexOfMaxValueOnTop.Count > 0)
                    ? (i - indexOfMaxValueOnTop.Peek())
                    : (i + 1);

            subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement;
            indexOfMaxValueOnTop.Push(i);
        }

        while (indexOfMaxValueOnTop.Count > 0)
        {
            int rangeToTheRightExcludingCurrentElement = input.Length - indexOfMaxValueOnTop.Peek() - 1;
            subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.Pop()] += rangeToTheRightExcludingCurrentElement;
        }

        return subarrayRangeWhereCurrentValueIsMax;
    }
}
