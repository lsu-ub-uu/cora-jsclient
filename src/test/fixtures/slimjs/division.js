/*
 *     Copied from https://github.com/noamtcohen/SlimJS
 */

var eg = {
    Division: function ()
    {
        var num;
        var denom;

        this.setNumerator = function (n)
        {
            num = n;
        }
        this.setDenominator = function (n)
        {
            denom = n;
        }
        this.quotient = function ()
        {
            return num / denom;
        }
    }
};

const Division = eg.Division;

export { Division };
