import CSS from 'csstype';
import dayjs, { Dayjs } from "dayjs";

export type TProducts = {
    id: string
    name: string
    nameSeller: string
    image: string
    price: number
    type: string
    simpleProduct?: {
        inventory:  number
    }
    rentProduct?: {
        rentType: string
        rentedDays: string
    }
    spaceProduct?:  {
        rentedDays: string
        location: string
    }
}

export const RENT_TYPES = Object.freeze({
    HOURS: 'hours',
    DAYS: 'days'
})


export const PRODUCTS_TYPES = Object.freeze({
    RENT: 'rent',
    SPACE: 'space',
    SIMPLE: 'simple'
})

export const AVAILABILITY = Object.freeze({
    AVAILABLE: 'available',
    OCCUPIED: 'occupied',
})

export type TLocation = {
    lat: number
    lng: number
}

export interface DayjsExtended extends dayjs.Dayjs {
    $d: Date;
}


export type TProductsC = {
    data: {
        products?: TProducts[]
        modal: boolean
        selectedProduct?: TProducts
        location?: TLocation 
        selectedDate: Date | null
        availability?: string
        dateEnd: DayjsExtended | null
        dateInit: DayjsExtended | null
        isNotAvilabilityPerHours?: boolean
    }
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    setDateInit: React.Dispatch<React.SetStateAction<DayjsExtended | null>>
    setDateEnd: React.Dispatch<React.SetStateAction<DayjsExtended | null>>
    changeProductSelected: (product: TProducts) => void
    handleDateChange: (date: Date | null) => void
    handleDateChangeTime: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => void
}

// STYLE TYPES

export type TBoxMap = {
    display?: boolean
}