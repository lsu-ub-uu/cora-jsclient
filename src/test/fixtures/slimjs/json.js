/*
 *     Copied from https://github.com/noamtcohen/SlimJS
 */

function Json()
{
    this.setJson = function (jsonObject)
    {
        this.obj = jsonObject;
    }

    this.XAndY = function ()
    {
        return this.obj.x + this.obj.y;
    }
}

export { Json };
