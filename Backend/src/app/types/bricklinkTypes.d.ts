type itemType = "MINIFIG" | "PART" | "SET" | "BOOK" | "GEAR" | "CATALOG" | "INSTRUCTION" | "UNSORTED_LOT" | "ORIGINAL_BOX"

type appearsAsType = "A" | "C" | "E" | "R"

type BricklinkItem = {
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

type BricklinkItemRequest = { 
    no: string
    type: itemType
}

type BricklinkSuperset = {
    color_id: number
    entries: {
        item: BricklinkItem
        quantity: number
        appears_as: appearsAsType
    }[]
}

type BricklinkSupersetRequest = {
    no: string
    type: itemType
    color_id: number

}

type BricklinkSubset = {
    match_no: number
    entries: {
        item: BricklinkItem
        color_id: number
        quantity: number
        extra_quantity: number
        is_alternate: boolean
        is_counterpart: boolean
    }[]
}

type BricklinkSubsetRequest = {
    no: string
    type: itemType
    color_id: number
    box: boolean
    instruction: boolean
    break_minifigs: boolean
    break_subsets: boolean
}

type BricklinkPriceGuide = {
    item: BricklinkItem
    new_or_used: "N" | "U"
    currency_code: string
    min_price: string
    max_price: string
    avg_price: string
    qty_avg_price: string
    unit_quantity: number
    total_quantity: number
    price_detail: (BricklinkCurrentPriceDetail | BricklinkPastPriceDetail)[]
}

type BricklinkPriceDetail = {
    quantity: number
    unit_price: string
}

type BricklinkCurrentPriceDetail = BricklinkPriceDetail & {
    shipping_available: boolean
}

type BricklinkPastPriceDetail = BricklinkPriceDetail & {
    seller_country_code: string
    buyer_country_code: string
    date_ordered: string
}

type BricklinkKnownColor = {
    color_id: string
    quantity: string
}

type BricklinkColor = {
    color_id: number
    color_name: string
    color_code: string
    color_type: string
}