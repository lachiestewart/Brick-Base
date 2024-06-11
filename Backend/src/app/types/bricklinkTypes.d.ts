type itemType = 'MINIFIG' | 'PART' | 'SET' | 'BOOK' | 'GEAR' | 'CATALOG' | 'INSTRUCTION' | 'UNSORTED_LOT' | 'ORIGINAL_BOX'

type appearsAsType = 'A' | 'C' | 'E' | 'R'

type bricklinkItem = {
    no: string
    name: string
    type: itemType
    category_id: number
    alternate_no: string
    image_url: string
    thumbnail_url: string
    weight: string
    dim_x: string
    dim_y: string
    dim_z: string
    year_released: number
    is_obsolete: boolean
    description?: string
    language_code?: string

}

type bricklinkSuperset = {
    color_id: number
    entries: {
        item: bricklinkItem
        quantity: number
        appears_as: appearsAsType
    }[]
}

type bricklinkSubset = {
    match_no: number
    entries: {
        item: bricklinkItem
        color_id: number
        quantity: number
        extra_quantity: number
        is_alternate: boolean
        is_counterpart: boolean
    }[]
}

type bricklinkPriceGuide = {
    item: bricklinkItem
    new_or_used: 'N' | 'U'
    currency_code: string
    min_price: string
    max_price: string
    avg_price: string
    qty_avg_price: string
    unit_quantity: number
    total_quantity: number
    price_detail: (bricklinkCurrentPriceDetail | bricklinkPastPriceDetail)[]
}

type bricklinkPriceDetail = {
    quantity: number
    unit_price: string
}

type bricklinkCurrentPriceDetail = bricklinkPriceDetail & {
    shipping_available: boolean
}

type bricklinkPastPriceDetail = bricklinkPriceDetail & {
    seller_country_code: string
    buyer_country_code: string
    date_ordered: string
}

type bricklinkKnownColor = {
    color_id: string
    quantity: string
}

type bricklinkColor = {
    color_id: number
    color_name: string
    color_code: string
    color_type: string
}