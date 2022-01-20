const o =
{
    sessionID: "8b3ffc73-2f52-46f7-a189-c8a3f4d57462Prod",
    XMLCriteria:
    `<Find sort_column_alias='bpart_id'
        sort_direction='+'
        force_sort='false'
        entity_name='product'
        query_name='product_ext_lup'
        pageNumber='1'
        getLookupRecordCount='true'
        bpart_id="SP-957-15812E-C21"
        a_warehouse_id="665-SD"
        a_inv_type_id="good">
    <operators values='like;=;=;' />
    <types values='string;argument;argument;' />
    <is_replace_alias values='Y;Y;Y;' />
</Find>`
}
// Entity: products
// Query: product_ext_lup   <- We can pair these under 'product'

//bpart_id <- Product Id. This is the first parameter.
//a_warehouse_id <- Warehouse Id. This is the second parameter.
//a_inv_type_id <- Inventory Type Id. This is the third parameter.

//The child nodes of the 'Find' node are necessary? parts that that determine how parameters are treated.