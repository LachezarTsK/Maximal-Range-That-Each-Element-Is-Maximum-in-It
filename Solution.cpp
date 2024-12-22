
using namespace std;

class Solution {

public:
    vector<int> maximumLengthOfRanges(const vector<int>& input) const {
        vector<int> subarrayRangeWhereCurrentValueIsMax(input.size());
        vector<int> indexOfMaxValueOnTop;

        for (size_t i = 0; i < input.size(); ++i) {
            while (!indexOfMaxValueOnTop.empty() && input[indexOfMaxValueOnTop.back()] < input[i]) {
                int rangeToTheRightExcludingCurrentElement = i - indexOfMaxValueOnTop.back() - 1;
                subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.back()] += rangeToTheRightExcludingCurrentElement;
                indexOfMaxValueOnTop.pop_back();
            }

            int rangeToTheLeftIncludingCurrentElement
                    = (!indexOfMaxValueOnTop.empty())
                    ? (i - indexOfMaxValueOnTop.back())
                    : (i + 1);

            subarrayRangeWhereCurrentValueIsMax[i] += rangeToTheLeftIncludingCurrentElement;
            indexOfMaxValueOnTop.push_back(i);
        }

        while (!indexOfMaxValueOnTop.empty()) {
            int rangeToTheRightExcludingCurrentElement = input.size() - indexOfMaxValueOnTop.back() - 1;
            subarrayRangeWhereCurrentValueIsMax[indexOfMaxValueOnTop.back()] += rangeToTheRightExcludingCurrentElement;
            indexOfMaxValueOnTop.pop_back();
        }

        return subarrayRangeWhereCurrentValueIsMax;
    }
};
