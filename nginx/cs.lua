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

url = string.split(ngx.var.uri, "/")

domain = "http://"..url[3].."-qa.doctorwork.com"
return domain
