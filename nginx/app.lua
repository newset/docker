#!/usr/bin/env lua


function string.split(str, delimiter)
    if str==nil or str=='' or delimiter==nil then
        return nil
    end
    
    local result = {}
    for match in (str..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match)
    end
    return result
end

aa = string.split(ngx.var.uri, "/")

bb = aa[1].."/"..aa[2].."/"..aa[3]
return bb
