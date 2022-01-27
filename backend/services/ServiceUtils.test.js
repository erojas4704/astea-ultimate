const e = require('express');
const { jsonAsteaQuery, entities, params, xmlAsteaQuery } = require('./ServiceUtils');
const session = {
    sessionID: '123456789'
}

function formatXML(xml) {
    return xml.replace(/\s+/g, ' ')
        .replace(/\s+</g, '<')
        .replace(/>\s+</g, '><')
        .replace(/\s+\/>/g, '/>')
        .replace(/>\s+&lt;/g, '>&lt;')
        .replace(/>&gt;\s+</g, '>&gt;<')
        .replace(/where_cond(\d)=\"\s+/g, 'where_cond$1="')
        .replace(/\)\s+\"/g, ')"')
        .trim();
}

describe("Forming Astea queries", () => {
    test("Run a search for materials: ", () => {
        const body = jsonAsteaQuery(
            session,
            entities.MATERIAL,
            {
                id: "SP-0",
            },
            1,
            true,

        );
        body.XMLCriteria = formatXML(body.XMLCriteria);
        expect(body).toEqual(materialSearch_1);
    });

    test("Run a search for an order:", () => {
        const body = formatXML(
            xmlAsteaQuery(
                session,
                entities.ORDER,
                {
                    criteria: {
                        id: "SV210",
                        actionGroup: "QNTech"
                    }
                },
                1, true, true, "open_date"
            )
        );
        expect(body).toEqual(locatorSearchXML_1);
    })
});

describe("Catch-all queries", () => {
    test("Run a search with an SV derived from a catch-all", () => {
        const body = formatXML(
            xmlAsteaQuery(
                session,
                entities.ORDER,
                {
                    criteria: {
                        all: "SV210",
                        actionGroup: "QNTech"
                    }
                },
                1, true, true, "open_date"
            )
        );
        expect(body).toEqual(allCriteriaSearchXML1);
    });
});

const materialSearch_1 = {
    "sessionID": session.sessionID,
    "XMLCriteria": formatXML(`<Find
            sort_column_alias=\"bpart_id\"
            sort_direction=\"+\"
            force_sort=\"false\"
            entity_name=\"product\"
            query_name=\"product_ext_lup\"
            pageNumber=\"1\"
            getLookupRecordCount=\"true\"
            bpart_id=\"SP-0\"><operators
            values=\"like;\"/>
            <types values=\"string;\"/>
            <is_replace_alias values=\"Y;\"/>
        </Find>`)
}

const locatorSearchXML_1 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="+"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                pageNumber="1"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( order_line.request_id LIKE &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"
                where_cond2="( c_order_line.request_id LIKE &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
                </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`)

const allCriteriaSearchXML1 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="+"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                pageNumber="1"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( order_line.request_id LIKE &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"
                where_cond2="( c_order_line.request_id LIKE &amp;apos;%SV210%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
                </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`)
