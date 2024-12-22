
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] maximumLengthOfRanges(int[] input) {
        int[] subarrayRangeWhereCurrentValueIsMax = new int[input.length];
        Deque<Integer> indexOfMaxValueOnTop = new ArrayDeque<>();

        for (int i = 0; i < input.length; ++i) {
            while (!indexOfMaxValueOnTop.isEmpty() && input[indexOfMaxValueOnTop.peek()] < input[i]) {
                int rangeToTheRightExcludingCurrentElement = i - indexOfMaxValueOnTop.peek() - 1;
                subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.pop()] += rangeToTheRightExcludingCurrentElement;
            }

            int rangeToTheLeftIncludingCurrentElement
                    = (!indexOfMaxValueOnTop.isEmpty())
                    ? (i - indexOfMaxValueOnTop.peek())
                    : (i + 1);

            subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement;
            indexOfMaxValueOnTop.push(i);
        }

        while (!indexOfMaxValueOnTop.isEmpty()) {
            int rangeToTheRightExcludingCurrentElement = input.length - indexOfMaxValueOnTop.peek() - 1;
            subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.pop()] += rangeToTheRightExcludingCurrentElement;
        }

        return subarrayRangeWhereCurrentValueIsMax;
    }
}
