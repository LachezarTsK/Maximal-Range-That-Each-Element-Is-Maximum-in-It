
class Solution {

    fun maximumLengthOfRanges(input: IntArray): IntArray {
        val subarrayRangeWhereCurrentValueIsMax = IntArray(input.size)
        val indexOfMaxValueOnTop = ArrayDeque<Int>()

        for (i in input.indices) {
            while (!indexOfMaxValueOnTop.isEmpty() && input[indexOfMaxValueOnTop.first()] < input[i]) {
                val rangeToTheRightExcludingCurrentElement = i - indexOfMaxValueOnTop.first() - 1
                subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.removeFirst()] += rangeToTheRightExcludingCurrentElement
            }

            val rangeToTheLeftIncludingCurrentElement =
                if (!indexOfMaxValueOnTop.isEmpty())
                    (i - indexOfMaxValueOnTop.first())
                else
                    (i + 1)

            subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement
            indexOfMaxValueOnTop.addFirst(i)
        }

        while (!indexOfMaxValueOnTop.isEmpty()) {
            val rangeToTheRightExcludingCurrentElement = input.size - indexOfMaxValueOnTop.first() - 1
            subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.removeFirst()] += rangeToTheRightExcludingCurrentElement
        }

        return subarrayRangeWhereCurrentValueIsMax
    }
}
