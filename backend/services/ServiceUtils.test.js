/**
 * These tests make sure our search queries are being formed correctly.
 */
const {
  jsonAsteaQuery,
  entities,
  params,
  xmlAsteaQuery,
} = require("./ServiceUtils");
const session = {
  sessionID: "123456789",
};

function formatXML(xml) {
  return xml
    .replace(/\s+/g, " ")
    .replace(/\s+</g, "<")
    .replace(/>\s+</g, "><")
    .replace(/\s+\/>/g, "/>")
    .replace(/>\s+&lt;/g, ">&lt;")
    .replace(/>&gt;\s+</g, ">&gt;<")
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
      true
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
            actionGroup: "QNTech",
          },
        },
        1,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(locatorSearchXML_1);
  });

  test("I can run a search for an order from a specific date", () => {
    const body = formatXML(
      xmlAsteaQuery(
        session,
        entities.ORDER,
        {
          criteria: {
            actionGroup: "QNTech",
            openDateFrom: "09/01/2021",
          },
        },
        1,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(locatorDateSearchXML_1);
  });
  test("I can run a search for an order from a specific date for page 2 of the results", () => {
    const body = formatXML(
      xmlAsteaQuery(
        session,
        entities.ORDER,
        {
          criteria: {
            actionGroup: "QNTech",
            openDateFrom: "09/01/2021",
          },
        },
        2,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(locatorSearchPage2XML_1);
  });
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
            actionGroup: "QNTech",
          },
        },
        1,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(allCriteriaSearchXML1);
  });
  test("Run a search with an SV derived from a catch-all with a full SV number", () => {
    const body = formatXML(
      xmlAsteaQuery(
        session,
        entities.ORDER,
        {
          criteria: {
            all: "SV2201170909",
            actionGroup: "QNTech",
          },
        },
        1,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(allCriteriaSearchXML2);
  });
  // test("Run a search with a tag derived from a catch-all search using regular expression", () => {
  //     const body = formatXML(
  //         xmlAsteaQuery(
  //             session,
  //             entities.ORDER,
  //             {
  //                 criteria: {
  //                     all: "145-215548",
  //                     actionGroup: "QNTech"
  //                 }
  //             },
  //             1, false, true, "open_date"
  //         )
  //     );
  //     expect(body).toEqual(allCriteriaSearchXML3);
  // });
  // test("Run a search with a complete tag with line number derived from a catch-all search using regular expression", () => {
  //     const body = formatXML(
  //         xmlAsteaQuery(
  //             session,
  //             entities.ORDER,
  //             {
  //                 criteria: {
  //                     all: "145-215548-1-1",
  //                     actionGroup: "QNTech"
  //                 }
  //             },
  //             1, false, true, "open_date"
  //         )
  //     );
  //     expect(body).toEqual(allCriteriaSearchXML4);
  // });
  test("Run a search with an SV derived from a catch-all with a full SV number including line appendix", () => {
    const body = formatXML(
      xmlAsteaQuery(
        session,
        entities.ORDER,
        {
          criteria: {
            all: "SV2201170909@@1",
            actionGroup: "QNTech",
          },
        },
        1,
        false,
        true,
        "open_date"
      )
    );
    expect(body).toEqual(allCriteriaSearchXML2);
  });
});

describe("Running macros", () => {
  test("Should properly formulate a macro with given criteria", () => {
      expect(createMacro()).toEqual(macroProduct_1)
      //TO BE IMPLEMENTEd
  });
});

const materialSearch_1 = {
  sessionID: session.sessionID,
  XMLCriteria: formatXML(`<Find
            sort_column_alias=\"bpart_id\"
            sort_direction=\"+\"
            force_sort=\"false\"
            entity_name=\"product\"
            query_name=\"product_ext_lup\"
            getLookupRecordCount=\"true\"
            bpart_id=\"SP-0\"><operators
            values=\"like;\"/>
            <types values=\"string;\"/>
            <is_replace_alias values=\"Y;\"/>
        </Find>`),
};

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
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
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
`);

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
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
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
`);
const allCriteriaSearchXML2 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( order_line.request_id LIKE &amp;apos;%SV2201170909%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"
                where_cond2="( c_order_line.request_id LIKE &amp;apos;%SV2201170909%&amp;apos; ) AND ( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
                </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`);
const allCriteriaSearchXML3 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( tagno like &amp;apos;%145-2155548%&amp;apos; )"
                where_cond2="( tagno like &amp;apos;%145-2155548%&amp;apos; )
                "&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;</XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`);
const allCriteriaSearchXML4 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( tagno like &amp;apos;%145-2155548-1-1%&amp;apos; )"
                where_cond2="( tagno like &amp;apos;%145-2155548-1-1%&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
            </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`);

//TODO concessions were made. I switched out &apos;gt; with &gt;
const locatorDateSearchXML_1 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; ) AND ( order_line.open_date &gt;= &amp;apos;20210901 00:00:00&amp;apos; )"
                where_cond2="( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; ) AND ( c_order_line.open_date &gt;= &amp;apos;20210901 00:00:00&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
            </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`);

const locatorSearchPage2XML_1 = formatXML(`
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
        <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
    </s:Header>
    <s:Body>
        <RetrieveXMLExt xmlns="http://astea.services.wcf/">
            <sessionID>${session.sessionID}</sessionID>
            <XMLCriteria>
                &lt;Find sort_column_alias="open_date"
                sort_direction="-"
                force_sort="true"
                entity_name="order_locator"
                query_name="order_locator_scrl"
                pageNumber="2"
                getRecordCount="true"
                a_fco_serv_bull_arg1="1=1"
                a_fco_serv_bull_arg2="1=1"
                a_order_type="1=1"
                a_c_order_type="1=1"
                where_cond1="( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; ) AND ( order_line.open_date &gt;= &amp;apos;20210901 00:00:00&amp;apos; )"
                where_cond2="( actgr.descr LIKE &amp;apos;%QNTech%&amp;apos; ) AND ( c_order_line.open_date &gt;= &amp;apos;20210901 00:00:00&amp;apos; )"&gt;
                &lt;operators values="=;=;=;=;=;=;" /&gt;
                &lt;types values="argument;argument;argument;argument;argument;argument;" /&gt;
                &lt;is_replace_alias values="Y;Y;Y;Y;N;N;" /&gt;
                &lt;/Find&gt;
            </XMLCriteria>
        </RetrieveXMLExt>
    </s:Body>
</s:Envelope>
`);

const macroProduct_1 = {
  macroName: "retrieve",
  bcName: "product",
  boAlias: "main",
  macroParameters:
    "<xml xmlns:dt='urn:schemas-microsoft-com:datatypes'><array><value dt:dt='string'>SP-661-05421</value></array></xml>",
  sessionId: "48d26caa-4ae2-4aaa-bf63-1de32129e51eProd",
  stateId: -1,
  saveState: false,
  closeState: false,
  xmlRequest:
    "<root xmlns:dt='urn:schemas-microsoft-com:datatypes'><GetCurrentState pageName='product_maint' stateID='-1'><BO alias='main'></BO><BO alias='productmeter'></BO><BO alias='pm_schedule_service'></BO></GetCurrentState></root>",
  moduleName: "product_maint",
};
