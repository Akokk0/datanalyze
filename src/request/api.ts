import request from "@/request/index";
import {SelectType} from "@/type/selectType";

export function getVehicleTypeByYear(data: number) {
    return request({
        url: `/getVehicleTypeByYear/${data}`,
        method: 'GET',
    })
}

export function getDataByCityAndYear(data: SelectType) {
    return request({
        url: `/getDataByCity/${data.city}/${data.year}`,
        method: 'GET'
    })
}
