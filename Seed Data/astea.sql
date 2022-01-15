--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Audits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Audits" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    technician_id character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Audits" OWNER TO postgres;

--
-- Name: Audits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Audits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Audits_id_seq" OWNER TO postgres;

--
-- Name: Audits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Audits_id_seq" OWNED BY public."Audits".id;


--
-- Name: Customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customers" (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Customers" OWNER TO postgres;

--
-- Name: Interactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Interactions" (
    id character varying(255) NOT NULL,
    message text DEFAULT ''::text NOT NULL,
    date timestamp with time zone DEFAULT '2021-12-28 17:31:11.77-05'::timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "TechnicianId" character varying(255),
    "OrderId" character varying(255)
);


ALTER TABLE public."Interactions" OWNER TO postgres;

--
-- Name: Materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Materials" (
    id character varying(255) NOT NULL,
    cost numeric(10,2) DEFAULT 0 NOT NULL,
    price numeric(10,2) DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    description character varying(255) DEFAULT ''::character varying NOT NULL,
    vendor character varying(255) DEFAULT ''::character varying NOT NULL,
    class character varying(255) DEFAULT ''::character varying NOT NULL,
    serialized boolean DEFAULT false NOT NULL,
    "isInventory" boolean DEFAULT true NOT NULL,
    "searchKey" character varying(255) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public."Materials" OWNER TO postgres;

--
-- Name: OrderAudits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderAudits" (
    id integer NOT NULL,
    location character varying(255) NOT NULL,
    order_id character varying(255) NOT NULL,
    status integer DEFAULT 0,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."OrderAudits" OWNER TO postgres;

--
-- Name: OrderAudits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderAudits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrderAudits_id_seq" OWNER TO postgres;

--
-- Name: OrderAudits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderAudits_id_seq" OWNED BY public."OrderAudits".id;


--
-- Name: OrderMaterial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderMaterial" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MaterialId" character varying(255) NOT NULL,
    "OrderId" character varying(255) NOT NULL
);


ALTER TABLE public."OrderMaterial" OWNER TO postgres;

--
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    id character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "requestId" character varying(255) NOT NULL,
    "openDate" timestamp with time zone NOT NULL,
    "isInHistory" boolean DEFAULT false NOT NULL,
    "serialNumber" character varying(255),
    "statusId" integer NOT NULL,
    problem text DEFAULT ''::text NOT NULL,
    warehouse character varying(255),
    "actionGroup" character varying(255),
    tag character varying(255),
    "TechnicianId" character varying(255),
    "CustomerId" character varying(255),
    "orderType" character varying(255),
    product character varying(255),
    type character varying(255)
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- Name: PurchaseRequisitionMaterial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PurchaseRequisitionMaterial" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "MaterialId" character varying(255) NOT NULL,
    "PurchaseRequisitionId" character varying(255) NOT NULL
);


ALTER TABLE public."PurchaseRequisitionMaterial" OWNER TO postgres;

--
-- Name: PurchaseRequisitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PurchaseRequisitions" (
    id character varying(255) NOT NULL,
    reference character varying(255),
    "vendorRMA" character varying(255),
    buyer character varying(255),
    "originalDocument" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PurchaseRequisitions" OWNER TO postgres;

--
-- Name: Technicians; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Technicians" (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    access character varying(255) DEFAULT 'user'::character varying NOT NULL
);


ALTER TABLE public."Technicians" OWNER TO postgres;

--
-- Name: Audits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits" ALTER COLUMN id SET DEFAULT nextval('public."Audits_id_seq"'::regclass);


--
-- Name: OrderAudits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderAudits" ALTER COLUMN id SET DEFAULT nextval('public."OrderAudits_id_seq"'::regclass);


--
-- Data for Name: Audits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Audits" (id, name, technician_id, "createdAt", "updatedAt") FROM stdin;
1	Audit_12/17/21	erojas1	2021-12-17 15:40:05.361-05	2021-12-17 15:40:05.361-05
3	Audit_12/21/21	erojas1	2021-12-21 10:54:05.706-05	2021-12-21 10:54:05.706-05
4	Audit_12/24/21	erojas1	2021-12-24 15:51:25.719-05	2021-12-24 15:51:25.719-05
\.


--
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customers" (id, name, "createdAt", "updatedAt") FROM stdin;
CUST2109302881	Jordan Young	2021-12-20 14:36:38.924-05	2021-12-20 14:36:38.924-05
CUST1405310656	DANIEL DOYLE	2021-12-20 14:48:37.202-05	2021-12-20 14:48:37.202-05
CUST1403313453	BORIS BORUHOV	2021-12-20 14:49:24.951-05	2021-12-20 14:49:24.951-05
CUST1901161666	AMIMUL BHUIYAN	2021-12-20 14:50:44.812-05	2021-12-20 14:50:44.812-05
CUST1709160488	GOLNAHAR BEGUM	2021-12-20 14:58:55.272-05	2021-12-20 14:58:55.272-05
CUST2108192155	WILBER TRIVINO	2021-12-20 15:02:33.333-05	2021-12-20 15:02:33.333-05
CUST2112204575	Htet Oo	2021-12-20 15:04:41.917-05	2021-12-20 15:04:41.917-05
CUST2112112115	YUAN TIAN	2021-12-20 16:29:04.341-05	2021-12-20 16:29:04.341-05
CUST1812296288	BENJAMIN MIRANDA	2021-12-20 16:30:07.587-05	2021-12-20 16:30:07.587-05
CUST2001034740	JACK BALDASAR	2021-12-20 16:30:14.102-05	2021-12-20 16:30:14.102-05
CUST2012200269	LILI VILLACIS	2021-12-20 16:31:22.655-05	2021-12-20 16:31:22.655-05
CUST20122011028	EDUARD KHVILOVSKIY	2021-12-20 16:31:28.015-05	2021-12-20 16:31:28.015-05
CUST2001295022	KIMBERLEE TRIGOBOFF	2021-12-20 16:31:34.395-05	2021-12-20 16:31:34.395-05
CUST2009083408	DANIEL DOLINSKY	2021-12-21 09:22:10.586-05	2021-12-21 09:22:10.586-05
CUST1408083355	SEVERIANO DOMINGO	2021-12-21 09:22:10.596-05	2021-12-21 09:22:10.596-05
CUST2112175796	ARCHIE MALDONADO	2021-12-21 09:22:10.597-05	2021-12-21 09:22:10.597-05
CUST1404264135	MADELIN VELASQUEZ	2021-12-21 09:22:10.598-05	2021-12-21 09:22:10.598-05
CUST1405094063	PETER WIEHL	2021-12-21 09:22:10.682-05	2021-12-21 09:22:10.682-05
CUST1408151886	JAMES DOUGLAS	2021-12-21 09:22:10.685-05	2021-12-21 09:22:10.685-05
CUST21121911451	Edward Thong	2021-12-21 09:22:10.686-05	2021-12-21 09:22:10.686-05
CUST1806013481	NATALIA SMALL	2021-12-21 09:22:10.687-05	2021-12-21 09:22:10.687-05
CUST2112037460	Nikodem Zalewski	2021-12-21 09:22:10.733-05	2021-12-21 09:22:10.733-05
CUST2112095326	DANIEL THORNTON	2021-12-21 09:22:10.847-05	2021-12-21 09:22:10.847-05
CUST2112047133	JONATHAN HWANG	2021-12-21 09:22:10.858-05	2021-12-21 09:22:10.858-05
CUST1610011291	DAVID CRIPTON	2021-12-21 09:22:10.874-05	2021-12-21 09:22:10.874-05
CUST1802274321	MICHAEL WINN	2021-12-21 09:22:10.894-05	2021-12-21 09:22:10.894-05
CUST2009095842	ANGEL GONZALEZ	2021-12-21 09:22:10.896-05	2021-12-21 09:22:10.896-05
CUST1801011960	ELKIN RIOS	2021-12-21 09:22:10.902-05	2021-12-21 09:22:10.902-05
CUST1407260777	KOMAL MANGROO	2021-12-21 09:22:10.944-05	2021-12-21 09:22:10.944-05
CUST1405283174	YOLANDA CORDERO	2021-12-21 09:22:10.946-05	2021-12-21 09:22:10.946-05
CUST1409135421	JOSEPH ASARO	2021-12-21 09:22:10.948-05	2021-12-21 09:22:10.948-05
CUST1804060761	JASON MEMIS	2021-12-21 09:22:10.957-05	2021-12-21 09:22:10.957-05
CUST1604190413	ANTHONY MATTIS	2021-12-21 09:22:10.973-05	2021-12-21 09:22:10.973-05
CUST2011091187	SHAFIUL ALAM	2021-12-21 09:22:10.983-05	2021-12-21 09:22:10.983-05
CUST2110141752	CORBETT GARRETT	2021-12-21 09:22:11.023-05	2021-12-21 09:22:11.023-05
CUST1301120133	SERGEY YASHIN	2021-12-21 09:22:11.03-05	2021-12-21 09:22:11.03-05
CUST1904033905	JOSE FRANCO	2021-12-21 09:22:11.032-05	2021-12-21 09:22:11.032-05
CUST1909090209	Kelvin Gomez	2021-12-21 09:22:11.05-05	2021-12-21 09:22:11.05-05
CUST1601202214	GIANCARLO CASTANO	2021-12-21 09:22:11.084-05	2021-12-21 09:22:11.084-05
CUST2112190985	AMAL BURKE	2021-12-21 09:22:11.086-05	2021-12-21 09:22:11.086-05
CUST1502241161	STEVEN KRITZ	2021-12-21 09:22:11.09-05	2021-12-21 09:22:11.09-05
CUST14042419489	CHINEDU EZEOFOR	2021-12-21 09:22:11.114-05	2021-12-21 09:22:11.114-05
CUST1707311454	JOHN KUHL	2021-12-21 09:22:11.118-05	2021-12-21 09:22:11.118-05
CUST1806285436	OKSANA PELEKH	2021-12-21 09:22:11.14-05	2021-12-21 09:22:11.14-05
CUST17123010242	MOHAMMAD MANSOURI	2021-12-21 09:22:11.156-05	2021-12-21 09:22:11.156-05
CUST1010211530	GERASIMOS STATHATOS	2021-12-21 09:22:11.194-05	2021-12-21 09:22:11.194-05
CUST1611258356	LYDIA MANNING-ALLRED	2021-12-21 09:22:11.209-05	2021-12-21 09:22:11.209-05
CUST2012264237	CHRISTOPHER AVILA	2021-12-21 09:22:11.212-05	2021-12-21 09:22:11.212-05
CUST1701311979	VINOD HOBALA	2021-12-21 09:22:11.24-05	2021-12-21 09:22:11.24-05
CUST2006197411	EVERETT BENJAMIN	2021-12-21 09:22:11.242-05	2021-12-21 09:22:11.242-05
CUST1502123037	ROBERT COHEN	2021-12-21 09:22:11.243-05	2021-12-21 09:22:11.243-05
CUST21112412888	JOSHUA CHO	2021-12-21 09:22:11.245-05	2021-12-21 09:22:11.245-05
CUST2002159547	FLOR CAMARENA	2021-12-21 09:22:11.263-05	2021-12-21 09:22:11.263-05
CUST2103177729	DASEAN WEEKS	2021-12-21 09:22:11.264-05	2021-12-21 09:22:11.264-05
CUST2112130095	SEBASTIAN VIDAL	2021-12-21 09:22:11.265-05	2021-12-21 09:22:11.265-05
CUST0901302326	SYED ALI	2021-12-21 09:22:11.267-05	2021-12-21 09:22:11.267-05
CUST1305300186	ALINE FANORD	2021-12-21 09:22:11.27-05	2021-12-21 09:22:11.27-05
CUST08011253802	YORIG REYES	2021-12-21 09:22:11.297-05	2021-12-21 09:22:11.297-05
CUST1502073460	YAJINDRA BOODRAM	2021-12-21 09:22:11.312-05	2021-12-21 09:22:11.312-05
CUST1403312259	MARK ARONOV	2021-12-21 09:22:11.343-05	2021-12-21 09:22:11.343-05
CUST2006290283	NELSON QU	2021-12-21 09:22:11.363-05	2021-12-21 09:22:11.363-05
CUST2112150389	MITCH MARCUS	2021-12-21 09:22:11.368-05	2021-12-21 09:22:11.368-05
CUST21111011550	JEREMY SIRACUSA	2021-12-21 09:22:11.379-05	2021-12-21 09:22:11.379-05
CUST1408242595	JORGE MUNOZ	2021-12-21 09:22:11.4-05	2021-12-21 09:22:11.4-05
CUST1212205355	IDAN.MR MOSHE	2021-12-21 09:22:11.425-05	2021-12-21 09:22:11.425-05
CUST1812238046	KRISTINA LARA	2021-12-21 09:22:11.428-05	2021-12-21 09:22:11.428-05
CUST071219971444	KENNETH WILKINSON	2021-12-21 09:22:11.436-05	2021-12-21 09:22:11.436-05
CUST1707131700	ANTHONY VOLPE	2021-12-21 09:22:11.437-05	2021-12-21 09:22:11.437-05
CUST2108112114	ERRON PATTERSON	2021-12-21 15:20:06.319-05	2021-12-21 15:20:06.319-05
CUST2107016029	DANIEL SONG	2021-12-21 15:22:41.458-05	2021-12-21 15:22:41.458-05
CUST071219461976	LAURA MASTRANGELO	2021-12-21 15:26:28.763-05	2021-12-21 15:26:28.763-05
CUST2101055346	martin vogel	2021-12-21 15:26:28.949-05	2021-12-21 15:26:28.949-05
CUST2007268459	PABLO ZEVALLOS	2021-12-21 15:26:28.994-05	2021-12-21 15:26:28.994-05
CUST21121815234	CONNER VANDEVENTER	2021-12-21 15:26:29.227-05	2021-12-21 15:26:29.227-05
CUST1708022691	TIM CAPICOTTO	2021-12-21 15:26:29.999-05	2021-12-21 15:26:29.999-05
CUST1404054044	DARIN LIU	2021-12-21 15:26:30.695-05	2021-12-21 15:26:30.695-05
CUST1405100479	SHARA WEISSER	2021-12-21 15:26:34.945-05	2021-12-21 15:26:34.945-05
CUST1605262605	DEBRA SPENCER	2021-12-21 16:00:55.978-05	2021-12-21 16:00:55.978-05
CUST2108305859	STEVE DOMINGUEZ	2021-12-21 16:01:05.584-05	2021-12-21 16:01:05.584-05
CUST1508232934	STEVEN ROCKLIN	2021-12-21 16:19:34.778-05	2021-12-21 16:19:34.778-05
CUST1907123317	HAMEED ABDUL	2021-12-22 09:28:35.513-05	2021-12-22 09:28:35.513-05
CUST1703150597	MICHAEL GATZONIS	2021-12-22 09:28:47.842-05	2021-12-22 09:28:47.842-05
CUST1404183542	JONAH FRANK	2021-12-22 09:28:59.749-05	2021-12-22 09:28:59.749-05
CUST1701262919	MYRIAM JEAN	2021-12-22 15:08:05.48-05	2021-12-22 15:08:05.48-05
CUST1301112313	ALFREDO ABUBO	2021-12-22 15:08:05.873-05	2021-12-22 15:08:05.873-05
CUST20092811928	KONSTANTINOS KOTIAS	2021-12-22 15:08:07.897-05	2021-12-22 15:08:07.897-05
CUST2001284849	FAUAD SHARIFF	2021-12-22 15:08:08.37-05	2021-12-22 15:08:08.37-05
CUST1206012964	ALPHONSO FRANKLIN	2021-12-22 15:08:09.171-05	2021-12-22 15:08:09.171-05
CUST2108247464	LUIS VINANZACA	2021-12-22 15:08:10.14-05	2021-12-22 15:08:10.14-05
CUST1404032486	JAMES WILLIAMS	2021-12-22 15:08:11.379-05	2021-12-22 15:08:11.379-05
CUST21122113261	Michael Abubo	2021-12-22 15:08:12.751-05	2021-12-22 15:08:12.751-05
CUST1409080363	KARLTON KELLY	2021-12-23 14:41:05.664-05	2021-12-23 14:41:05.664-05
CUST2012094720	NICHOLAS GORDON	2021-12-23 14:41:07.182-05	2021-12-23 14:41:07.182-05
CUST2111124468	MYLES NEIL	2021-12-23 14:41:07.823-05	2021-12-23 14:41:07.823-05
CUST1407181184	ZAFAR BOLTAEV	2021-12-23 14:53:47.935-05	2021-12-23 14:53:47.935-05
CUST1601182718	MICHAEL FELLUS	2021-12-23 14:58:47.887-05	2021-12-23 14:58:47.887-05
CUST2009103446	GERARDO RIVERA	2021-12-23 15:39:12.216-05	2021-12-23 15:39:12.216-05
CUST1812284142	YITZCHAK GREENBERG	2021-12-23 15:39:12.789-05	2021-12-23 15:39:12.789-05
CUST1102125470	DEREK HEMMINGS	2021-12-23 15:40:02.394-05	2021-12-23 15:40:02.394-05
CUST1911071452	ATIFRAHMAN NIAZY	2021-12-23 15:40:04.072-05	2021-12-23 15:40:04.072-05
CUST1907101451	PATRICIO VALENCIA	2021-12-23 15:46:03.75-05	2021-12-23 15:46:03.75-05
CUST20082912588	HORACIO GUZMAN	2021-12-23 17:08:52.328-05	2021-12-23 17:08:52.328-05
CUST21010717301	TIFFANY VALENTIN	2021-12-23 17:10:32-05	2021-12-23 17:10:32-05
CUST21032716057	TINA JEAN	2021-12-24 09:09:39.747-05	2021-12-24 09:09:39.747-05
CUST21031713316	JOHN VALDESPINO	2021-12-24 09:10:52.78-05	2021-12-24 09:10:52.78-05
CUST1001292516	THOMAS KRICHEL	2021-12-24 10:20:30.327-05	2021-12-24 10:20:30.327-05
CUST1404011526	IRIS GEROFSKY	2021-12-24 10:20:39.669-05	2021-12-24 10:20:39.669-05
CUST1406011080	LEVY ABDURAKHMANOV	2021-12-24 10:25:01.263-05	2021-12-24 10:25:01.263-05
CUST2004173728	kemar asphall	2021-12-24 10:25:25.253-05	2021-12-24 10:25:25.253-05
CUST1411263886	SURINDER SANGH	2021-12-24 10:25:25.269-05	2021-12-24 10:25:25.269-05
CUST1409032721	MASUMA HUSSAIN	2021-12-24 10:25:26.526-05	2021-12-24 10:25:26.526-05
CUST20100725851	MICKY SWEENEY	2021-12-24 10:25:27.016-05	2021-12-24 10:25:27.016-05
CUST1607312331	ANZOR AMINOV	2021-12-24 10:25:32.997-05	2021-12-24 10:25:32.997-05
CUST20122610720	CANDICE MOHR	2021-12-24 10:25:33.144-05	2021-12-24 10:25:33.144-05
CUST2006231881	BARBARA HULL	2021-12-24 12:10:22.642-05	2021-12-24 12:10:22.642-05
CUST1511072818	DANIEL DOLINSKY	2021-12-24 12:14:57.964-05	2021-12-24 12:14:57.964-05
CUST21020410029	NAAVA WASSERMAN	2021-12-24 14:29:51.929-05	2021-12-24 14:29:51.929-05
CUST1809134147	NOORUS JAMIL	2021-12-24 15:59:15.914-05	2021-12-24 15:59:15.914-05
CUST21031316796	TYLER HAMM	2021-12-24 15:59:16.235-05	2021-12-24 15:59:16.235-05
CUST080122344480	SAJIB HAQUE	2021-12-24 15:59:16.529-05	2021-12-24 15:59:16.529-05
CUST1803295309	MRINMOY BANERJEE	2021-12-24 15:59:17.997-05	2021-12-24 15:59:17.997-05
CUST1511303607	TEVIN JACQUES	2021-12-24 15:59:18.918-05	2021-12-24 15:59:18.918-05
CUST2103317688	MATTHEW LECHTANSKI	2021-12-24 15:59:19.462-05	2021-12-24 15:59:19.462-05
CUST20112211450	ESPERANZA HERNANDEZ	2021-12-24 15:59:19.657-05	2021-12-24 15:59:19.657-05
CUST2104215078	BORIS SHIMONOV	2021-12-24 15:59:22.687-05	2021-12-24 15:59:22.687-05
CUST2111057411	WINDGER MILLIEN	2021-12-24 15:59:23.215-05	2021-12-24 15:59:23.215-05
CUST1105181899	EDWARD MCDOUGAL	2021-12-24 15:59:23.753-05	2021-12-24 15:59:23.753-05
CUST1409230883	ANDREW MORALES	2021-12-24 15:59:25.527-05	2021-12-24 15:59:25.527-05
CUST1909204455	JOEL ACOSTA	2021-12-24 15:59:25.6-05	2021-12-24 15:59:25.6-05
CUST1906233908	EVOLLYNN LIN	2021-12-24 15:59:26.65-05	2021-12-24 15:59:26.65-05
CUST1903222077	CHRISTOPHER NIEVES	2021-12-24 15:59:27.046-05	2021-12-24 15:59:27.046-05
CUST2108060663	MOHAMMAD ABEDIN	2021-12-24 15:59:29.081-05	2021-12-24 15:59:29.081-05
CUST2101235750	Luigi Cabonargi	2021-12-24 15:59:30.302-05	2021-12-24 15:59:30.302-05
CUST1512313252	SALIH OSMAN	2021-12-24 15:59:30.661-05	2021-12-24 15:59:30.661-05
CUST2009145319	MARIA VILLACORTA	2021-12-24 15:59:33.183-05	2021-12-24 15:59:33.183-05
CUST080114196746	WILLIAM BARRON	2021-12-24 15:59:34.989-05	2021-12-24 15:59:34.989-05
CUST2008239820	ABID CHOWDHURY	2021-12-28 14:24:33.916-05	2021-12-28 14:24:33.916-05
CUST2111071453	ANDRE BOREK	2021-12-28 14:24:37.017-05	2021-12-28 14:24:37.017-05
CUST1505220600	TAMARA LAWRENCE	2021-12-28 14:24:42.058-05	2021-12-28 14:24:42.058-05
CUST17112421721	ALVI HOSSAIN	2021-12-28 14:24:45.601-05	2021-12-28 14:24:45.601-05
CUST1701191557	SPENCER MILLER	2021-12-28 14:24:47.838-05	2021-12-28 14:24:47.838-05
CUST1405114089	JOLYN KRAMBERG	2021-12-28 14:25:04.074-05	2021-12-28 14:25:04.074-05
CUST0712192281636	DOROTHY GIST	2021-12-28 14:39:54.233-05	2021-12-28 14:39:54.233-05
CUST2112223147	BRANDON LOPEZ	2021-12-28 14:39:54.768-05	2021-12-28 14:39:54.768-05
CUST1405131888	FRAN FRIDIEN	2021-12-28 14:40:02.655-05	2021-12-28 14:40:02.655-05
CUST2109220620	BRYENT SARYWATI	2021-12-28 14:40:03.246-05	2021-12-28 14:40:03.246-05
CUST1412021681	KANWAL SINGH	2021-12-28 14:40:03.612-05	2021-12-28 14:40:03.612-05
CUST1405273704	NERIYE MURADOV	2021-12-28 14:40:08.6-05	2021-12-28 14:40:08.6-05
CUST2007074123	GRANVILLE GRAHAM	2021-12-28 16:03:35.113-05	2021-12-28 16:03:35.113-05
\.


--
-- Data for Name: Interactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Interactions" (id, message, date, "createdAt", "updatedAt", "TechnicianId", "OrderId") FROM stdin;
SV2112170770@@1-3	customer updated. customer has approved for hard drive replacement with 8GB memory upgrade only. part is on order	2021-12-19 16:58:20-05	2021-12-23 12:56:15.577-05	2021-12-23 12:56:15.577-05	\N	\N
SV2112170770@@1-2	hard drive replacement with 16GB ram upgrade is 795.96 plus tax. contacting customer for an update.	2021-12-17 19:51:18-05	2021-12-23 12:56:15.578-05	2021-12-23 12:56:15.578-05	\N	\N
SV2112270484@@1-0	unit checked into service for repair and data backup. unit is under apple warranty	2021-12-28 10:43:07-05	2021-12-28 14:24:47.921-05	2021-12-28 14:24:47.921-05	\N	\N
SV2112270484@@1-2	sent the customer an update text	2021-12-28 10:46:49-05	2021-12-28 14:24:47.926-05	2021-12-28 14:24:47.926-05	\N	\N
SV2112220606@@1-0	unit checked into service for possible repair. the display is cracked with apple limited warranty only	2021-12-26 14:51:55-05	2021-12-28 14:24:51.506-05	2021-12-28 14:24:51.506-05	\N	\N
SV2112220587@@1-0	Messaged "Hello we checked your desktop and so far just seems like a corrupt operating system. It would be 100 plus tax to reinstall the operating system and all data would be erased.\r\n" and they approved	2021-12-27 18:49:41-05	2021-12-28 14:24:53.707-05	2021-12-28 14:24:53.707-05	\N	\N
SV2112170770@@1-0	unit checked into service for diagnostics and possible upgrades. now running apple diagnostics.	2021-12-17 19:50:25-05	2021-12-23 12:56:15.576-05	2021-12-23 12:56:15.576-05	\N	\N
SV2112220606@@1-1	unit has passed diagnostics. estimated cost of repair is 515.00 plus tax. sending customer an update text	2021-12-26 14:52:23-05	2021-12-28 14:24:51.507-05	2021-12-28 14:24:51.507-05	\N	\N
SV2112210899@@1-0	logic board is defective. starting repair estimate is 879.98	2021-12-22 21:05:24-05	2021-12-23 14:49:08.511-05	2021-12-23 14:49:08.511-05	\N	\N
SV2112270668@@1-0	unit checked into service for diagnostics under apple limited warranty. unit has lines on the display.	2021-12-27 19:09:25-05	2021-12-28 14:40:13.353-05	2021-12-28 14:40:13.353-05	\N	\N
SV2112210899@@1-1	recommend data backup for 149.99	2021-12-22 21:07:57-05	2021-12-23 14:49:08.512-05	2021-12-23 14:49:08.512-05	\N	\N
SV2112270668@@1-1	issue confirmed. the display is cracked/damaged. unit has passed all other apple diagnostics. out of warranty repair repair estimate is 680.00 plus tax. contacting customer for an update.	2021-12-27 19:10:01-05	2021-12-28 14:40:13.355-05	2021-12-28 14:40:13.355-05	\N	\N
SV2112200586@@1-0	unit shipped to apple for service. apple care+ service charge - 299.99	2021-12-22 21:18:13-05	2021-12-23 16:08:43.647-05	2021-12-23 16:08:43.647-05	\N	\N
RP2011240139@@1-1	the power button on the topcase is defective. unit powers on with jump start. now running diagnostics.	2020-11-25 17:53:28-05	2021-12-28 16:03:35.214-05	2021-12-28 16:03:35.214-05	\N	\N
RP2011240139@@1-3	called customer for an update. recommended not repairing unit given the cost. customer will pick up the unit as is. closing work order	2020-11-29 13:49:56-05	2021-12-28 16:03:35.223-05	2021-12-28 16:03:35.223-05	\N	\N
SV2112170498@@1-0	775586629642	2021-12-22 19:51:03-05	2021-12-23 16:12:12.974-05	2021-12-23 16:12:12.974-05	\N	\N
RP2011240139@@1-2	unit has passed diagnostics. while running tests i noticed the display backlight go out several times. the display needs to be replaced as well.	2020-11-25 17:53:58-05	2021-12-28 16:03:35.216-05	2021-12-28 16:03:35.216-05	\N	\N
RP2011240139@@1-4	PARTS NEEDED \r\nSP-661-6595  Topcase, W/Keyboard, No Trackpad Exch Only  1  each  665-SD   Needed  \r\n2  SP-661-6594  E78 Clamshell, Display, 13"- Glossy	2020-11-29 13:50:58-05	2021-12-28 16:03:35.227-05	2021-12-28 16:03:35.227-05	\N	\N
SV2112170156@@1-0	Rec. text: Bluetooth on this computer isn't working, even tho' I *know* my Bluetooth device *is* working (does w/ another computer). Please add to work order to completely check & restore Bluetooth functionality.	2021-12-17 15:31:44-05	2021-12-23 17:07:47.366-05	2021-12-23 17:07:47.366-05	\N	\N
RP2011240139@@1-0	customer has checked in a macbook for diagnostics. customer states that the unit doesnt power on. now inspecting hardware for issues.	2020-11-25 17:52:59-05	2021-12-28 16:03:35.217-05	2021-12-28 16:03:35.217-05	\N	\N
SV2112170156@@1-1	cost of repair is 550.00 plus tax. unit service plan does not cover damage. contacting service management	2021-12-21 10:39:43-05	2021-12-23 17:07:47.368-05	2021-12-23 17:07:47.368-05	\N	\N
RP2011240139@@1-5	Will be putting unit downstairs	2021-02-21 14:52:14-05	2021-12-28 16:03:35.23-05	2021-12-28 16:03:35.23-05	\N	\N
SV2112170583@@1-0	unit checked into service for repair. the imac has heavy physical damage. the display and housing is damaged. now running apple diagnostics.	2021-12-17 18:33:43-05	2021-12-23 17:09:08.258-05	2021-12-23 17:09:08.258-05	\N	\N
SV2112170583@@1-1	diagnostics complete. the parts needed for repair are on order under apple care + the apple care service fee of 299.99 applies.	2021-12-17 18:34:07-05	2021-12-23 17:09:08.259-05	2021-12-23 17:09:08.259-05	\N	\N
SV2112200418@@1-0	Texted "Hello we checked the HP desktop and on both the VGA and HDMI port it boots up to the setup screen without any issues on our end. Turned it on several times." and "For what we checked currently nothing more, if you want us to setup the desktop to have a profile it is a $40 charge. I do recommend virus protection for the computer to be safe while browsing the web, banking etc. 3 Years is only 99.99 plus tax, program is called ESET and it is what I use at home. I would wave the 40 fee for setup if you want us to install some virus protection for you. But yes bring in the monitor. Tried your computer with 2 monitors here.\r\n" They will be in tomorrow at 10 to test with their monitor.	2021-12-23 18:00:57-05	2021-12-23 18:44:16.57-05	2021-12-23 18:44:16.57-05	\N	\N
SV2112170369@@1-0	unit checked into service for diagnostics. unit no longer powers on	2021-12-17 21:24:24-05	2021-12-24 10:20:41.421-05	2021-12-24 10:20:41.421-05	\N	\N
SV2112170369@@1-1	the unit is contaminated , unit has been sealed. contacting customer. diagnostics have been cancelled. a refund will be issued.	2021-12-17 21:24:43-05	2021-12-24 10:20:41.423-05	2021-12-24 10:20:41.423-05	\N	\N
SV2112170656@@1-0	Texted customer "Hi this is Micro Center. We got your PC to display, it was a detached CPU cable. We noticed your audio cable was not installed right and that your motherboard also was not installed correctly. You are missing standoffs to properly screw in the motherboard. If you would like us to install the motherboard correctly, it would be $80 plus tax."	2021-12-18 17:07:19-05	2021-12-24 10:20:54.727-05	2021-12-24 10:20:54.727-05	\N	\N
SV2112180385@@1-0	Texted:"Hi Michael, this is Travis from Micro Center. I placed an order for a replacement motherboard for your laptop. It should arrive within 5 business days. I will contact you when the repair is complete and ready for pick up. "	2021-12-19 12:13:49-05	2021-12-24 10:20:55.871-05	2021-12-24 10:20:55.871-05	\N	\N
SV2112180236@@1-0	unit checked into service for diagnostics/ repair under apple care+ service plan . unit has water damage.	2021-12-20 13:25:17-05	2021-12-24 10:20:57.87-05	2021-12-24 10:20:57.87-05	\N	\N
SV2112180595@@1-1	diagnostics show the battery has failed. estimated cost of repair  is 365.00 plus tax	2021-12-19 16:56:10-05	2021-12-24 10:20:59.677-05	2021-12-24 10:20:59.677-05	\N	\N
SV2112190101@@1-0	Texted:"Hi David, this is Travis from Micro Center. Your laptop is missing a hard drive and RAM. Without these parts a complete diagnostics is not possible. The laptop works with our parts. I would suspect that you may have a corrupt OS, which is causing the start up loop. The screen is also quite damaged. If you would like us to install a new drive the service charge would be $150 + tax plus the cost of the drive of your choice. The service charge to install a new RAM stick would be $20 + tax plus the cost of the RAM and the cost to replace the screen would be $300 + tax. "	2021-12-19 13:06:01-05	2021-12-24 10:21:10.29-05	2021-12-24 10:21:10.29-05	\N	\N
SV2112190295@@1-1	unit needs to be shipped to apple for service.	2021-12-19 15:51:46-05	2021-12-24 10:21:11.628-05	2021-12-24 10:21:11.628-05	\N	\N
SV2112190100@@1-0	customer has checked in a macbook air for diagnostics, unit has liquid damage and no longer powers on.	2021-12-19 15:58:28-05	2021-12-24 10:21:13.054-05	2021-12-24 10:21:13.054-05	\N	\N
SV2112190100@@1-3	customer has declined apple depot . customer will pickup the unit as is	2021-12-20 13:18:10-05	2021-12-24 10:21:13.058-05	2021-12-24 10:21:13.058-05	\N	\N
SV2112200731@@1-0	instore recovery failed. customer wiill pickup as is	2021-12-24 09:07:59-05	2021-12-24 10:21:30.4-05	2021-12-24 10:21:30.4-05	\N	\N
SV2112210684@@1-0	data backup is not possible. contacting customer for an update.	2021-12-22 21:15:23-05	2021-12-24 10:21:47.603-05	2021-12-24 10:21:47.603-05	\N	\N
SV2112210633@@1-0	cracked display replacement via ADH service plan	2021-12-22 21:18:52-05	2021-12-24 10:21:50.692-05	2021-12-24 10:21:50.692-05	\N	\N
SV2112210443@@1-0	network card slightly disconnected. Ran Diagnostics and found no issues. Ran updates and works fine. Contacted customer for pickup	2021-12-24 09:23:48-05	2021-12-24 10:21:58.708-05	2021-12-24 10:21:58.708-05	\N	\N
SV2112210528@@1-0	Order placed for replacement keyboard / informed customer	2021-12-23 19:10:28-05	2021-12-24 10:22:03.487-05	2021-12-24 10:22:03.487-05	\N	\N
SV2112170497@@1-0	775586650784	2021-12-22 19:58:29-05	2021-12-24 10:20:51.52-05	2021-12-24 10:20:51.52-05	\N	\N
SV2112170277@@1-0	System has a fan that is making a lot of noise, and not working right. I believe this is the cause of the overheating since the fan is not able to efficiently cool the system. Quoted the customer $69.99 for the repair and waiting for a response.	2021-12-20 13:42:19-05	2021-12-24 10:20:53.808-05	2021-12-24 10:20:53.808-05	\N	\N
SV2112170656@@1-1	Customer will pick up as is.	2021-12-18 17:22:00-05	2021-12-24 10:20:54.729-05	2021-12-24 10:20:54.729-05	\N	\N
SV2112180236@@1-1	the unit will need to be shipped to apple for repair. apple care+ service fee of 299.99 applies.	2021-12-20 13:25:37-05	2021-12-24 10:20:57.871-05	2021-12-24 10:20:57.871-05	\N	\N
SV2112180595@@1-0	customer has checked in a macbook for possible battery replacement and diagnostics	2021-12-19 16:55:36-05	2021-12-24 10:20:59.676-05	2021-12-24 10:20:59.676-05	\N	\N
SV2112190305@@1-0	Messaged "Hello we did a check on your desktop with our OS and the ethernet port is working and is not loose. When this motherboard was installed it was not done 100% correct since there is a piece of metal in one of the USB ports and in the Ethernet port from the IO shield. Internet works on our OS and on your OS it shows as ethernet is connected but I do not have the password/pin to log in. If you want us to check in your OS we need the PIN and if you want us to reinstall the motherboard correctly removing and reinstalling it is $80 plus tax"	2021-12-21 19:45:00-05	2021-12-24 10:21:07.14-05	2021-12-24 10:21:07.14-05	\N	\N
SV2112190101@@1-1	Customer will pick up as is.	2021-12-19 13:23:54-05	2021-12-24 10:21:10.291-05	2021-12-24 10:21:10.291-05	\N	\N
SV2112190295@@1-0	apple watch checked into service under apple warranty. unit no longer shows a display	2021-12-19 15:51:30-05	2021-12-24 10:21:11.628-05	2021-12-24 10:21:11.628-05	\N	\N
SV2112190100@@1-2	sent the customer an update text	2021-12-19 16:01:34-05	2021-12-24 10:21:13.056-05	2021-12-24 10:21:13.056-05	\N	\N
SV2112170497@@1-1	12*9*4	2021-12-22 19:58:31-05	2021-12-24 10:20:51.518-05	2021-12-24 10:20:51.518-05	\N	\N
SV2112180236@@1-2	find my device is still active. contacting customer for an update.	2021-12-20 13:25:58-05	2021-12-24 10:20:57.872-05	2021-12-24 10:20:57.872-05	\N	\N
SV2112180595@@1-2	sent customer an update text . waiting on customer approval	2021-12-19 16:56:34-05	2021-12-24 10:20:59.678-05	2021-12-24 10:20:59.678-05	\N	\N
SV2112190327@@1-0	gave customer price quote. waiting for response	2021-12-23 14:22:59-05	2021-12-24 10:21:01.847-05	2021-12-24 10:21:01.847-05	\N	\N
SV2112190477@@1-0	Does post and has passed diag	2021-12-20 15:00:49-05	2021-12-24 10:21:05.933-05	2021-12-24 10:21:05.933-05	\N	\N
SV2112190305@@1-1	They approved so reseated MB and two metal pieces from IO shield are no longer in the Ethernet and USB port. Unit boots and ethernet is dected still. Texted that unit is ready	2021-12-23 09:43:22-05	2021-12-24 10:21:07.141-05	2021-12-24 10:21:07.141-05	\N	\N
SV2112190295@@1-2	FIND MY DEVICE is still active. contacting customer for an update.	2021-12-19 15:51:58-05	2021-12-24 10:21:11.629-05	2021-12-24 10:21:11.629-05	\N	\N
SV2112190100@@1-1	issue confirmed. multiple parts will need to be replaced for repair. the unit will need to be shipped to Apple for repair. Tier 4 repair estimate is 900.00 plus tax	2021-12-19 15:58:49-05	2021-12-24 10:21:13.055-05	2021-12-24 10:21:13.055-05	\N	\N
SV2112200482@@1-0	unit passed diagnostics. recommending SSD upgrade for repair. repair estimate is 286.98	2021-12-22 21:16:51-05	2021-12-24 10:21:17.407-05	2021-12-24 10:21:17.407-05	\N	\N
SV2112200432@@1-0	unit needed to be recharged. ipad powers on . passed MRI diagnostics. unit is ready for pickup. sending customer an update text	2021-12-22 20:58:30-05	2021-12-24 10:21:23.059-05	2021-12-24 10:21:23.059-05	\N	\N
SV2112210370@@1-0	unit checked into service with physical damage. the display is cracked. customer will be issued a gift card in the amount of 379.99 , under service contract - SVK145-1868109-6-1	2021-12-22 20:52:14-05	2021-12-24 10:21:52.25-05	2021-12-24 10:21:52.25-05	\N	\N
SV2112210302@@1-1	repair complete. unit is ready for pickup	2021-12-21 19:53:59-05	2021-12-24 10:21:57.548-05	2021-12-24 10:21:57.548-05	\N	\N
SV2112200357@@1-0	test	2021-12-23 15:23:41-05	2021-12-24 10:21:26.236-05	2021-12-24 10:21:26.236-05	\N	\N
SV2112210633@@1-1	find my device is still active. contacting customer for an update. part is on hold	2021-12-22 21:19:05-05	2021-12-24 10:21:50.693-05	2021-12-24 10:21:50.693-05	\N	\N
SV2112210302@@1-0	iphone se display replacement via apple care+	2021-12-21 19:53:45-05	2021-12-24 10:21:57.547-05	2021-12-24 10:21:57.547-05	\N	\N
SV2112170568@@1-0	Texted:"Hi Golnahar, this is Travis from Micro Center. The replacement screen for your computer is not available. We will issue you a gift card at the value of $722.96 for your computer. You may come in at your soonest convenience to pick up the gift card. "	2021-12-18 14:52:11-05	2021-12-24 10:23:36.278-05	2021-12-24 10:23:36.278-05	\N	\N
SV2112220568@@1-0	ipad with cracked display checked into service via ADH service plan	2021-12-22 20:54:39-05	2021-12-24 10:25:01.364-05	2021-12-24 10:25:01.364-05	\N	\N
SV2112220568@@1-1	customer will be issued a gift card for 289.99 under service contract SVK145-2174455-4-1	2021-12-22 20:55:18-05	2021-12-24 10:25:01.365-05	2021-12-24 10:25:01.365-05	\N	\N
SV2112200147@@1-1	issue confirmed. the display backlight is defective.	2021-12-24 11:24:28-05	2021-12-24 11:51:16.85-05	2021-12-24 11:51:16.85-05	\N	\N
SV2112200147@@1-0	unit checked in to service for diagnostics. unit powers on with no display.	2021-12-24 11:24:14-05	2021-12-24 11:51:16.849-05	2021-12-24 11:51:16.849-05	\N	\N
SV2112200147@@1-5	SP-661-07950B  Top Case with Battery REPLACE, ANSI, Space Gray  1  each  665-SD   Needed  \r\n2  SP-661-07970  Display Assembly, Space Gray EXCH	2021-12-24 11:25:42-05	2021-12-24 11:51:16.858-05	2021-12-24 11:51:16.858-05	\N	\N
SV2112200147@@1-4	customer has declined repair. will pickup unit as is.	2021-12-24 11:25:21-05	2021-12-24 11:51:16.859-05	2021-12-24 11:51:16.859-05	\N	\N
SV2112200147@@1-2	diagnostics show the battery is failing as well.	2021-12-24 11:24:42-05	2021-12-24 11:51:16.851-05	2021-12-24 11:51:16.851-05	\N	\N
SV2112200147@@1-3	unit is not eligable for the apple quality service program . estimated cost of repair is 994.97 plus tax.	2021-12-24 11:24:52-05	2021-12-24 11:51:16.857-05	2021-12-24 11:51:16.857-05	\N	\N
SV2107020115@@1-2	customer has been updated. customer has provided the password for windows.	2021-07-07 19:27:06-04	2021-12-24 12:10:23.04-05	2021-12-24 12:10:23.04-05	\N	\N
SV2107020115@@1-3	during system stress the unit froze and display glicthed. the motherboard is defective.	2021-07-07 19:27:19-04	2021-12-24 12:10:23.048-05	2021-12-24 12:10:23.048-05	\N	\N
SV2107020115@@1-0	customer has checked in a acer laptop for diagnostics. customer states that the laptop and charger get very hot during use. now running hardware diagnostics.	2021-07-05 14:41:31-04	2021-12-24 12:10:23.038-05	2021-12-24 12:10:23.038-05	\N	\N
SV2107020115@@1-4	cost of repair is 720.00 plus tax, sent customer an update text	2021-07-07 19:32:17-04	2021-12-24 12:10:23.051-05	2021-12-24 12:10:23.051-05	\N	\N
SV2107020115@@1-1	unit has passed diagnostics and system stress test. unit temp remained acceptable. charger did not over heat. contacting customer for an update. unable to duplicate issue.	2021-07-05 14:42:14-04	2021-12-24 12:10:23.039-05	2021-12-24 12:10:23.039-05	\N	\N
SV2107020115@@1-5	customer has been updated. recommend the unit be replaced instead of repair.	2021-07-20 13:16:55-04	2021-12-24 12:10:23.053-05	2021-12-24 12:10:23.053-05	\N	\N
SV2110310286@@1-2	Opened depot case: SR1075390932	2021-11-11 15:31:23-05	2021-12-24 12:10:35.269-05	2021-12-24 12:10:35.269-05	\N	\N
SV2110310286@@1-1	Customer approved depot. Unit submitted to PC for ship out	2021-11-11 09:23:39-05	2021-12-24 12:10:35.268-05	2021-12-24 12:10:35.268-05	\N	\N
SV2110310286@@1-5	Unit could not be repaired at depot. Approved gift card for value of laptop + tax.	2021-12-23 15:13:11-05	2021-12-24 12:10:35.276-05	2021-12-24 12:10:35.276-05	\N	\N
SV2110310286@@1-0	Texted:"Hello, this is Micro Center. Your laptop has passed our diagnostics tests. I would suggest sending the laptop to Dell for their evaluation/ repair or replacement of the unit. The turn around time is typically 2-3 weeks. With your permission I can have it send out as soon as possible. "	2021-11-08 09:22:50-05	2021-12-24 12:10:35.267-05	2021-12-24 12:10:35.267-05	\N	\N
SV2110310286@@1-3	To depot: 1Z07F7A39000138549	2021-11-15 10:56:46-05	2021-12-24 12:10:35.269-05	2021-12-24 12:10:35.269-05	\N	\N
SV2110310286@@1-4	Sent e-mail to Dell for update	2021-12-08 17:24:29-05	2021-12-24 12:10:35.278-05	2021-12-24 12:10:35.278-05	\N	\N
SV2104080523@@1-0	This product has a one year limited warranty and is entitled to depot/Carry-in repair service.  End Date: 2021-09-02	2021-04-08 18:13:46-04	2021-12-24 12:42:31.191-05	2021-12-24 12:42:31.191-05	\N	\N
SV2104080523@@1-2	Fan replaced. Unit works as expected. Texted customer to pick up unit.	2021-04-09 11:09:00-04	2021-12-24 12:42:31.189-05	2021-12-24 12:42:31.189-05	\N	\N
SV2104080523@@1-1	Unit displays fan error message and shuts off immidiately. Replacement fan ordered.	2021-04-08 18:35:21-04	2021-12-24 12:42:31.193-05	2021-12-24 12:42:31.193-05	\N	\N
SV2104080533@@1-0	Unit needed to have motherboard rebranded. Unit is ready for pick up. Texted customer with update.	2021-04-08 18:11:58-04	2021-12-24 12:42:54.273-05	2021-12-24 12:42:54.273-05	\N	\N
SV2106170451@@1-1	Ordered box for depot repairs. 40DP57M	2021-06-18 17:01:04-04	2021-12-24 12:42:56.622-05	2021-12-24 12:42:56.622-05	\N	\N
SV2106170451@@1-3	Returned from depot	2021-06-24 17:56:14-04	2021-12-24 12:42:56.626-05	2021-12-24 12:42:56.626-05	\N	\N
SV2102180177@@1-1	CID observed on LCD Back cover, edges of top case and edges of bottom cover. Unit passed Lenovo's GoldKey Diagnostics: U1X3Q7WQA-KGHBNC. Unit works well. Customer requested cosmetic damage assesment. This will not be covered under warranty	2021-02-19 11:50:40-05	2021-12-24 12:42:58.83-05	2021-12-24 12:42:58.83-05	\N	\N
SV2106170451@@1-0	Unit intermittently refuses to start. Customer approved Depot.	2021-06-18 14:39:47-04	2021-12-24 12:42:56.621-05	2021-12-24 12:42:56.621-05	\N	\N
SV2102180177@@1-3	Texted customer with info and to pick up unit.	2021-02-19 12:09:29-05	2021-12-24 12:42:58.831-05	2021-12-24 12:42:58.831-05	\N	\N
SV2106170451@@1-2	TO DEPOT: \r\n5161 7116 5557	2021-06-21 10:37:20-04	2021-12-24 12:42:56.623-05	2021-12-24 12:42:56.623-05	\N	\N
SV2102180177@@1-2	LCD back cover, top case and bottom cover unavailable OOW.	2021-02-19 12:08:29-05	2021-12-24 12:42:58.831-05	2021-12-24 12:42:58.831-05	\N	\N
SV2102180177@@1-0	This product has a one year limited warranty and is entitled to depot/Carry-in repair service. Expires 09/09/2021.	2021-02-19 11:50:01-05	2021-12-24 12:42:58.828-05	2021-12-24 12:42:58.828-05	\N	\N
SV2106170452@@1-0	Screen replaed. Texted customer to pick up unit,	2021-06-21 10:53:26-04	2021-12-24 12:43:16.696-05	2021-12-24 12:43:16.696-05	\N	\N
SV2104080538@@1-0	This product has a one year limited warranty and is entitled to depot/Carry-in repair service. End Date: 2021-08-25	2021-04-08 17:20:58-04	2021-12-24 12:44:26.591-05	2021-12-24 12:44:26.591-05	\N	\N
SV2104080538@@1-4	LCD replaced. Unit works as expected. Texted customer to pick up laptop.	2021-04-09 11:25:36-04	2021-12-24 12:44:26.599-05	2021-12-24 12:44:26.599-05	\N	\N
RP2009080210@@1-0	Motherboad and WLAN card will be replaced. Bit locker is enabled on drive. Branding of replacement motherboard not fully possible unless unit is depot.	2020-09-12 13:22:21-04	2021-12-24 12:44:28.627-05	2021-12-24 12:44:28.627-05	\N	\N
SV2102180187@@1-0	This product has a one year limited warranty and is entitled to depot/Carry-in repair service.	2021-02-19 14:34:45-05	2021-12-24 12:44:31.053-05	2021-12-24 12:44:31.053-05	\N	\N
SV2102180184@@1-4	Texted customer to pick up unit	2021-02-18 14:37:07-05	2021-12-24 12:44:34.899-05	2021-12-24 12:44:34.899-05	\N	\N
SV2104080538@@1-1	NO CID	2021-04-08 17:21:11-04	2021-12-24 12:44:26.593-05	2021-12-24 12:44:26.593-05	\N	\N
SV2102180187@@1-4	Texted:"Hi Dan, your laptop is ready for pick up. Keep in mind that BItlocker has been activated due to the change in hardware. You will need to log in to the Microsoft account associated with the laptop and enter the 48 digit numerical key when prompted."	2021-03-08 12:57:00-05	2021-12-24 12:44:31.055-05	2021-12-24 12:44:31.055-05	\N	\N
SV2102180184@@1-1	No CID	2021-02-18 14:28:48-05	2021-12-24 12:44:34.898-05	2021-12-24 12:44:34.898-05	\N	\N
SV2104080538@@1-2	Unit has defect in LCD. Replacement ordered.	2021-04-08 17:21:20-04	2021-12-24 12:44:26.594-05	2021-12-24 12:44:26.594-05	\N	\N
SV2102180187@@1-3	Motherboard replaced.Unit works as expected. Bitlocker activated.	2021-03-08 12:53:52-05	2021-12-24 12:44:31.055-05	2021-12-24 12:44:31.055-05	\N	\N
SV2102180184@@1-2	Unit needed BIOS and driver updates. Camera works.	2021-02-18 14:29:04-05	2021-12-24 12:44:34.898-05	2021-12-24 12:44:34.898-05	\N	\N
SV2104080538@@1-3	Texted customer to update.	2021-04-08 18:10:39-04	2021-12-24 12:44:26.595-05	2021-12-24 12:44:26.595-05	\N	\N
RP2009080210@@1-1	Called customer and left message informing that the unit is ready for pick up.Branding of the board is not 100% complete and does not hinder performance, and to unlock Bitlocker he would have to sign into his Microsoft account to get the key.	2020-09-17 14:09:44-04	2021-12-24 12:44:28.629-05	2021-12-24 12:44:28.629-05	\N	\N
SV2102180187@@1-2	Hi Dan this is Travis from Micro Center. You checked in three Lenovo laptops for repair. The laptop with serial number: PF2DBK90 has a bad motherboard and will be replaced under warranty. Keep in mind that there is a state of emergency in Texas where Lenovo is locates. This is causing major delays in part shipments. We do not currently have a definite timeline for this but we will keep you updated.	2021-02-19 14:36:40-05	2021-12-24 12:44:31.054-05	2021-12-24 12:44:31.054-05	\N	\N
SV2102180184@@1-0	This product has a one year limited warranty and is entitled to depot/Carry-in repair service.	2021-02-18 14:28:44-05	2021-12-24 12:44:34.897-05	2021-12-24 12:44:34.897-05	\N	\N
SV2102180187@@1-1	No CID. Passed: U1EDAWMD6-ATZGH4	2021-02-19 14:36:32-05	2021-12-24 12:44:31.054-05	2021-12-24 12:44:31.054-05	\N	\N
SV2102180184@@1-3	Unit passed Lenovo Goldkey Diagnostics: U1SUNA5GG-QFVE44.	2021-02-18 14:29:46-05	2021-12-24 12:44:34.899-05	2021-12-24 12:44:34.899-05	\N	\N
SV2110010366@@1-0	BIOS update complete. Texted customer to pick up unit.	2021-10-02 12:21:50-04	2021-12-24 12:45:34.725-05	2021-12-24 12:45:34.725-05	\N	\N
SV2108040217@@3-0	Unit passed diags. Offered Assurance plan. Awating customer decision.	2021-08-05 16:46:03-04	2021-12-24 12:46:23.959-05	2021-12-24 12:46:23.959-05	\N	\N
SV2109080529@@1-1	Replacement board was located and ordered.	2021-09-19 18:28:12-04	2021-12-24 12:51:39.555-05	2021-12-24 12:51:39.555-05	\N	\N
SV2109080529@@1-2	Motherboard replaced. Unit tested and works as expected. Texted customer to pick up unit.	2021-09-22 16:29:00-04	2021-12-24 12:51:39.562-05	2021-12-24 12:51:39.562-05	\N	\N
SV2109080529@@1-0	Serial number is R90P2JS7	2021-09-16 15:37:01-04	2021-12-24 12:51:39.554-05	2021-12-24 12:51:39.554-05	\N	\N
SV2102050457@@1-3	Back up complete. Texted customer to pick up unit and back up drive.	2021-02-08 11:58:22-05	2021-12-24 14:29:52.16-05	2021-12-24 14:29:52.16-05	\N	\N
SV2102050457@@1-2	Customer approved $150 DBU.	2021-02-08 11:58:09-05	2021-12-24 14:29:52.161-05	2021-12-24 14:29:52.161-05	\N	\N
SV2102050457@@1-0	Unit not powering on, even with AC power alone. Motherboard needs to be replaced.	2021-02-05 17:02:07-05	2021-12-24 14:29:52.159-05	2021-12-24 14:29:52.159-05	\N	\N
SV2102050457@@1-1	Texted:"Hi Naava, this is Travis form Micro Center. Unfortunately, your laptop needs a replacement motherboard. The total cost to replace the motherboard would be $515 + tax. I would advise against the repair due to the cost of repair and to just get your data backed up to an external drive for $150."	2021-02-05 17:02:43-05	2021-12-24 14:29:52.161-05	2021-12-24 14:29:52.161-05	\N	\N
SV2110080649@@1-1	Parts have not arrived from Acer, will see if we can get replacement unit	2021-10-30 16:53:40-04	2021-12-24 15:59:16.04-05	2021-12-24 15:59:16.04-05	\N	\N
SV2110080649@@1-2	Emailed acer to see if we can get a replacement part or replacement	2021-11-04 10:38:23-04	2021-12-24 15:59:16.049-05	2021-12-24 15:59:16.049-05	\N	\N
SV2110270159@@1-4	customer has not responded. closing work order.	2021-11-09 09:39:41-05	2021-12-24 15:59:21.169-05	2021-12-24 15:59:21.169-05	\N	\N
SV2110280668@@1-0	Texted "Hello we checked your desktop and the motherboard is defective. If you would like to replace the motherboard yourself you can come anytime for the desktop.\r\n"	2021-11-02 20:04:22-04	2021-12-24 15:59:21.571-05	2021-12-24 15:59:21.571-05	\N	\N
SV2111060216@@1-0	Texted:"Hi Edward, this is Travis from Micro Center. Your laptop needs a replacement motherboard. Unfortunately this part is not available from any of our vendors. This means that we would not be able to repair the laptop. If you would like the data on the hard drive saved, we can back it up to an external drive for $150 + tax. Otherwise you may pick up the laptop at your soonest convenience. "	2021-11-08 15:04:46-05	2021-12-24 15:59:23.823-05	2021-12-24 15:59:23.823-05	\N	\N
SV2111040811@@1-1	Customer will pickup as is. New number (347)981-0138	2021-11-07 15:03:18-05	2021-12-24 15:59:23.978-05	2021-12-24 15:59:23.978-05	\N	\N
SV2111050927@@1-0	Drive does not mount, data backup not possible. Contacting customer	2021-11-07 11:13:37-05	2021-12-24 15:59:24.567-05	2021-12-24 15:59:24.567-05	\N	\N
SV2111110129@@1-0	diags passed. running stress tests	2021-11-15 18:29:29-05	2021-12-24 15:59:27.123-05	2021-12-24 15:59:27.123-05	\N	\N
SV2111080238@@1-2	estimated cost of repair is 315.00 plus tax. sending customer an update text/	2021-11-08 19:47:17-05	2021-12-24 15:59:27.216-05	2021-12-24 15:59:27.216-05	\N	\N
SV2111080257@@1-0	Customer said there is no power. CPU has bent pins, needs to be replaced. Motherboard doesn't post properly. Doing diag.\r\nMotherboard and power supply also aren't screwed down properly.	2021-11-10 11:51:16-05	2021-12-24 15:59:27.493-05	2021-12-24 15:59:27.493-05	\N	\N
SV2111120202@@1-0	This product has a three year limited warranty and is entitled to depot/Carry-in repair service. End Date: 2021-11-19	2021-11-13 12:21:08-05	2021-12-24 15:59:27.918-05	2021-12-24 15:59:27.918-05	\N	\N
SV2111120202@@1-5	Ordered box for depot shipout: 2004477720	2021-11-18 11:16:29-05	2021-12-24 15:59:27.927-05	2021-12-24 15:59:27.927-05	\N	\N
SV2111090462@@1-0	customer has checked in a macbook air for repair under apple warranty. unit no longer boots into macOS. now running apple diagnostics.	2021-11-14 11:36:06-05	2021-12-24 15:59:28.43-05	2021-12-24 15:59:28.43-05	\N	\N
SV2111160540@@1-3	return tracking: 9202 3946 5301 2374 7231 45	2021-11-29 13:02:30-05	2021-12-24 15:59:33.273-05	2021-12-24 15:59:33.273-05	\N	\N
SV2111140477@@1-4	customer has been updated. customer may pickup the unit as is.	2021-11-22 13:44:45-05	2021-12-24 15:59:33.665-05	2021-12-24 15:59:33.665-05	\N	\N
SV2111150529@@1-0	customer has checked in iphone for repair under apple warranty, the customer states the iphone no longer gets service. now running apple diagnostics.	2021-11-16 10:46:38-05	2021-12-24 15:59:35.659-05	2021-12-24 15:59:35.659-05	\N	\N
SV2110080649@@1-0	Texted "Hello we ordering a replacement fan and trackpad. Trackpad works but we are ordering one anyway under warranty.Parts should take approx 5 business days to arrive. "	2021-10-09 16:48:35-04	2021-12-24 15:59:16.038-05	2021-12-24 15:59:16.038-05	\N	\N
SV2110080649@@1-3	Part back ordered until the 19th. Authorized return for store credit. Notified cust.	2021-11-11 12:37:01-05	2021-12-24 15:59:16.052-05	2021-12-24 15:59:16.052-05	\N	\N
SV2110120669@@1-1	Texted: "I completed the OS Reimage and installed Windows updates and drivers, then ran and completed diagnostics without further issues, your unit is ready for pickup."	2021-10-18 20:28:43-04	2021-12-24 15:59:16.38-05	2021-12-24 15:59:16.38-05	\N	\N
SV2110140283@@1-1	Repair unsuccessful. Issue with motherboard. Customer will pick up as is.	2021-10-21 12:41:42-04	2021-12-24 15:59:16.608-05	2021-12-24 15:59:16.608-05	\N	\N
SV2110300756@@1-2	Unit came back from the depot.	2021-11-18 17:44:06-05	2021-12-24 15:59:18.993-05	2021-12-24 15:59:18.993-05	\N	\N
SV2111030283@@1-2	To depot:2858 9666 8782	2021-11-11 11:04:09-05	2021-12-24 15:59:19.792-05	2021-12-24 15:59:19.792-05	\N	\N
SV2111030466@@1-0	Texted:"Hi Dean, this is Travis from Micro Center. the drive in your laptop has failed and needs to be replaced. The total cost to replace the drive is $260 + tax. Please let me know if you would like to proceed with the repair. "	2021-11-08 13:38:33-05	2021-12-24 15:59:20.046-05	2021-12-24 15:59:20.046-05	\N	\N
SV2110220150@@1-2	texted customer again	2021-11-10 12:48:49-05	2021-12-24 15:59:20.528-05	2021-12-24 15:59:20.528-05	\N	\N
SV2110270159@@1-0	customer has checked in a macbook air for diagnostics. the customer states the unit has a storage issue. now running apple diagnostics.	2021-10-29 19:35:12-04	2021-12-24 15:59:21.166-05	2021-12-24 15:59:21.166-05	\N	\N
SV2111120202@@1-4	Customer approved depot. Unit submitted to PC	2021-11-17 16:02:39-05	2021-12-24 15:59:27.922-05	2021-12-24 15:59:27.922-05	\N	\N
SV2111090462@@1-3	replacement parts installed. repair complete. unit has passed diagnostics. contacting customer for an update. unit is ready for pickup	2021-11-19 17:49:45-05	2021-12-24 15:59:28.432-05	2021-12-24 15:59:28.432-05	\N	\N
SV2111110171@@1-0	The necessary part to replace the keyboard is not available with ASUS or on E-bay. Texted customer this information.	2021-11-11 16:02:04-05	2021-12-24 15:59:28.712-05	2021-12-24 15:59:28.712-05	\N	\N
SV2111160540@@1-2	Texted:"Hi Maria, this is Travis from Micro Center. Your laptop has been repaired and is ready for pick up. Keep in mind that due to the change in hardware, Bitlocker is activated on the drive. In order to unlock the drive you would have to log in to your Microsoft account that is associated with this laptop and enter the 48 digit numerical key provided. You may use this link to get the key. https://account.microsoft.com/devices/recoverykey"	2021-11-29 12:54:36-05	2021-12-24 15:59:33.272-05	2021-12-24 15:59:33.272-05	\N	\N
SV2111140477@@1-2	sent the customer an update. estimated cost of repair is 365.00 plus tax	2021-11-16 15:42:43-05	2021-12-24 15:59:33.663-05	2021-12-24 15:59:33.663-05	\N	\N
SV2111150529@@1-4	customer is unable to remove find my device. customer will pickup unit as is. closing work order	2021-11-19 14:16:35-05	2021-12-24 15:59:35.662-05	2021-12-24 15:59:35.662-05	\N	\N
SV2111160472@@1-1	issue confirmed. the unit powers on with a blank display ...unit has passed apple diagnostics.	2021-11-16 18:18:08-05	2021-12-24 15:59:36.588-05	2021-12-24 15:59:36.588-05	\N	\N
SV2110120669@@1-0	Freezing at startup was confirmed on multiple restarts. Customer confirmed OS Reimage.	2021-10-18 11:19:12-04	2021-12-24 15:59:16.382-05	2021-12-24 15:59:16.382-05	\N	\N
SV2111030283@@1-3	Unit returned from depot. Notified customer	2021-11-29 12:29:57-05	2021-12-24 15:59:19.792-05	2021-12-24 15:59:19.792-05	\N	\N
SV2111030466@@1-1	Customer not reachable via call. Closing order and placeing in cage for pick up.	2021-12-08 14:06:29-05	2021-12-24 15:59:20.047-05	2021-12-24 15:59:20.047-05	\N	\N
SV2110220150@@1-0	instore data diagnostic in progress	2021-10-24 11:25:07-04	2021-12-24 15:59:20.526-05	2021-12-24 15:59:20.526-05	\N	\N
SV2110270159@@1-2	for repair the battery will need to be replaced and macOS reinstalled. contacting customer for an update. estimated cost of repair is 350.00 without data backup	2021-10-29 19:35:45-04	2021-12-24 15:59:21.168-05	2021-12-24 15:59:21.168-05	\N	\N
SV2111040509@@1-0	Texted:"Hi Boris, this is Travis from Micro Center. Your laptop needs a replacement motherboard. The cost to replace the mother board would be $540 + tax. I would not recommend the repair due to the cost. You can purchase a new laptop. "	2021-11-04 16:00:46-04	2021-12-24 15:59:22.778-05	2021-12-24 15:59:22.778-05	\N	\N
SV2111080182@@1-1	the display is damaged . the estimated cost of repair is 675.98 plus tax. sending customer an update.	2021-11-09 10:20:01-05	2021-12-24 15:59:26.598-05	2021-12-24 15:59:26.598-05	\N	\N
SV2111080238@@1-1	diagnostics complete. testing shows the battery has failed.	2021-11-08 19:47:00-05	2021-12-24 15:59:27.212-05	2021-12-24 15:59:27.212-05	\N	\N
SV2111120202@@1-2	Motherboard ordered. Texted customer with update,	2021-11-13 12:27:43-05	2021-12-24 15:59:27.92-05	2021-12-24 15:59:27.92-05	\N	\N
SV2111120202@@1-7	Unit returned from depot. Notifying customer.	2021-11-29 12:18:03-05	2021-12-24 15:59:27.926-05	2021-12-24 15:59:27.926-05	\N	\N
SV2111090462@@1-2	logic board has arrived and installed. the battery has failed diagnostics as well. part is on order for repair. sending customer an update text	2021-11-17 14:31:17-05	2021-12-24 15:59:28.431-05	2021-12-24 15:59:28.431-05	\N	\N
SV2111130903@@1-0	Unit has defective CPU. Customer will pick up unit as is.	2021-11-18 13:37:53-05	2021-12-24 15:59:29.154-05	2021-12-24 15:59:29.154-05	\N	\N
SV2111160540@@1-1	PR for repalcement motherboard submitted.	2021-11-19 16:43:02-05	2021-12-24 15:59:33.271-05	2021-12-24 15:59:33.271-05	\N	\N
SV2111140477@@1-3	customer has been updated.	2021-11-21 19:06:23-05	2021-12-24 15:59:33.664-05	2021-12-24 15:59:33.664-05	\N	\N
SV2111150529@@1-3	sent the customer another update. find my device is still active.	2021-11-19 13:55:56-05	2021-12-24 15:59:35.661-05	2021-12-24 15:59:35.661-05	\N	\N
SV2111160472@@1-0	customer has checked in a macbook for diagnostics. customer states the unit has booting / display issues. now running apple diagnostics.	2021-11-16 18:17:45-05	2021-12-24 15:59:36.587-05	2021-12-24 15:59:36.587-05	\N	\N
SV2110140283@@1-0	Texted:"Hi Sajib, this is Travis from Micro Center. Your laptop has passed all hardware diagnostic tests. Your new SSD is also reading although it was not initiated. I would have to perform a system recovery on the unit in order to install the operating system. The service charge would be $99.99. Would you like me to proceed?"	2021-10-16 14:43:26-04	2021-12-24 15:59:16.612-05	2021-12-24 15:59:16.612-05	\N	\N
SV2110300756@@1-1	Case was opened with Microsoft: 1530786440\r\nSending to depot: 1Z W85 97X 87 0455 7393	2021-11-04 16:04:15-04	2021-12-24 15:59:18.992-05	2021-12-24 15:59:18.992-05	\N	\N
SV2111030283@@1-1	Opened case for box pickup + repair: BRVC4028	2021-11-08 17:54:44-05	2021-12-24 15:59:19.791-05	2021-12-24 15:59:19.791-05	\N	\N
SV2110170460@@1-0	Texted "Hello we checked the laptop and the hard drive has failed. If data is needed then data recovery would be the only option and for a drive of this size it would be 1400 to send the drive out for data recovery. Your battery is also swelling slightly that plus the failed drive plus the condition of the computer I'd recommend putting money towards a new machine\r\n"	2021-10-23 16:29:44-04	2021-12-24 15:59:20.449-05	2021-12-24 15:59:20.449-05	\N	\N
SV2110220150@@1-1	gilware data recovery successful. notified customer	2021-10-25 18:15:11-04	2021-12-24 15:59:20.527-05	2021-12-24 15:59:20.527-05	\N	\N
SV2110270159@@1-1	diagnostics show the battery has failed.	2021-10-29 19:35:35-04	2021-12-24 15:59:21.167-05	2021-12-24 15:59:21.167-05	\N	\N
SV2111080238@@1-3	customer has been updated. customer was informed that the cost of repair would be 200.00 as per apple website. I let the customer known that apple repair prices differ from microcenter repairs. customer would like to pickup the unit as is.	2021-11-08 20:22:18-05	2021-12-24 15:59:27.217-05	2021-12-24 15:59:27.217-05	\N	\N
SV2111080257@@1-1	Texted that RGB header was installed wrong, paste in socket, bent pins on CPU. They will pick up unit as is	2021-11-11 12:33:22-05	2021-12-24 15:59:27.494-05	2021-12-24 15:59:27.494-05	\N	\N
SV2111120202@@1-1	NO CID. No boot no power. PR for replacement motherboard submitted.	2021-11-13 12:21:17-05	2021-12-24 15:59:27.919-05	2021-12-24 15:59:27.919-05	\N	\N
SV2111120202@@1-6	To depot: 5505 9367 0002	2021-11-22 10:06:40-05	2021-12-24 15:59:27.927-05	2021-12-24 15:59:27.927-05	\N	\N
SV2111090462@@1-1	diagnostics complete. the logic board is unstable. will replace logic board under apple warranty. contacting customer for an update. parts are on order for repair.	2021-11-14 11:36:34-05	2021-12-24 15:59:28.431-05	2021-12-24 15:59:28.431-05	\N	\N
SV2111140107@@1-0	computer wouldnt boot. reseated power supply. cleaned out computer. computer turned on and got to windows afterwards. diags passed. contacted customer for pickup	2021-11-18 21:05:42-05	2021-12-24 15:59:30.78-05	2021-12-24 15:59:30.78-05	\N	\N
SV2111160540@@1-0	Texted:"Hi Maria, this is Travis from Micro Center. Your laptop has passed all hardware diagnostic tests and no Malware was detected in the operating system. The unit is also performing fine with no signs of bluescreening even under extensive stress tests. No repairs are recommended at this time. You may pick up the laptop a your soonest convenience. "	2021-11-19 15:49:18-05	2021-12-24 15:59:33.27-05	2021-12-24 15:59:33.27-05	\N	\N
SV2111140477@@1-0	customer has checked in a macbook pro for diagnostics. the customer states the unit doesnt power on or charge.	2021-11-16 15:42:04-05	2021-12-24 15:59:33.661-05	2021-12-24 15:59:33.661-05	\N	\N
SV2111140477@@1-5	SP-661-8154B	2021-11-22 13:45:13-05	2021-12-24 15:59:33.671-05	2021-12-24 15:59:33.671-05	\N	\N
SV2111150529@@1-2	find my device is still active...	2021-11-16 10:47:41-05	2021-12-24 15:59:35.66-05	2021-12-24 15:59:35.66-05	\N	\N
SV2111160472@@1-2	ive tested the macbook with a known good display. unit works without issue. the display will need to be replaced for repair.	2021-11-19 21:16:56-05	2021-12-24 15:59:36.588-05	2021-12-24 15:59:36.588-05	\N	\N
SV2110300756@@1-0	Emailed "Hello we have the surface ready to ship out but before we do do you have all your data? Microsoft will likely replace the device so if data is needed you can come in to back it up or for 149.99 plus tax we can backup the data to a 1TB external drive. We would just need the password and only pictures, documents, music and videos are backed up."	2021-11-01 18:00:13-04	2021-12-24 15:59:18.993-05	2021-12-24 15:59:18.993-05	\N	\N
SV2111030283@@1-0	Texted:"Hi Esperanza, this is Travis from Micro Center.  We would have to send your laptops to HP for evaluation,  repair/ replacement. The turn around time is typically 2-3 weeks. With your approval i can have it shipped out asap."	2021-11-08 12:03:56-05	2021-12-24 15:59:19.79-05	2021-12-24 15:59:19.79-05	\N	\N
SV2110270159@@1-3	customer has been updated about repair options. customer has not responded. waiting on customer	2021-11-03 12:41:39-04	2021-12-24 15:59:21.168-05	2021-12-24 15:59:21.168-05	\N	\N
SV2111040811@@1-0	Texted: "I used a service PSU for the unit without success, . then tested the unit's GPU, RAM, M.2 SSD, and PSU on our test bench without issues. The motherboard seems to be defective and would need replacement, but the parts are unavailable in our store and only 10th to 12th Gen components are available for Intel. Please let me know if you would like to install a new CPU and motherboard for $150 + parts and tax, thank you."	2021-11-07 12:03:08-05	2021-12-24 15:59:23.977-05	2021-12-24 15:59:23.977-05	\N	\N
SV2111080182@@1-0	Customer's name is Hyunhee and the Find my device is still active.	2021-11-08 12:30:11-05	2021-12-24 15:59:26.596-05	2021-12-24 15:59:26.596-05	\N	\N
SV2111110129@@1-1	stress tests passed. playing games passed. updated windows. no corrupted system files found. reset bios settings to default. contacted customer for pickup	2021-11-18 14:49:38-05	2021-12-24 15:59:27.124-05	2021-12-24 15:59:27.124-05	\N	\N
SV2111080238@@1-0	customer has checked in a macbook pro for diagnostics and battery replacement. now running apple diagnostics.	2021-11-08 19:44:10-05	2021-12-24 15:59:27.212-05	2021-12-24 15:59:27.212-05	\N	\N
SV2111120202@@1-3	Texted:"Hi Vi, this is Travis from Micro Center. I placed an order for a replacement motherboard for your laptop. The part should arrive within 5 business days. I will let you know when the laptop is ready for pick up"	2021-11-13 12:29:42-05	2021-12-24 15:59:27.921-05	2021-12-24 15:59:27.921-05	\N	\N
SV2111140477@@1-1	issue confirmed. the battery has failed diagnostics. contacting customer for an update.	2021-11-16 15:42:24-05	2021-12-24 15:59:33.662-05	2021-12-24 15:59:33.662-05	\N	\N
SV2111150529@@1-1	the unit has passed all apple diagnostics. call and celluar included.  contacting customer for an update. unit can be shipped to Apple for service.	2021-11-16 10:47:10-05	2021-12-24 15:59:35.66-05	2021-12-24 15:59:35.66-05	\N	\N
SV2111160472@@1-3	customer has declined repair. will pickup unit as is.	2021-11-21 11:29:39-05	2021-12-24 15:59:36.589-05	2021-12-24 15:59:36.589-05	\N	\N
SV2112210804@@1-0	Ordered box for depot repair:\nSR1079763841	2021-12-24 14:35:47-05	2021-12-24 16:59:32.639-05	2021-12-24 16:59:32.639-05	\N	\N
SV2112200011@@1-0	JZLQHT2	2021-12-24 14:47:13-05	2021-12-24 17:32:23.928-05	2021-12-24 17:32:23.928-05	\N	\N
SV2112220423@@1-0	Messaged "Hello we checked the computer and it passed tests. Computer is slow because this is a lower end model with a basic processor. (this cannot be upgraded), storage is built into the board at 64GB also due to the type of model it is. Not much I can do about storage. You can use a Micro SD to move some files over. As for it turning off the RAM is bad requiring a motherboard replacement which will erase all data. I can try backing up the pictures, documents, music and videos to a external drive for 149.99 plus tax. Programs will need to be reinstalled. Let me know if you want us to backup the data.\n"	2021-12-24 17:51:19-05	2021-12-24 18:28:22.858-05	2021-12-24 18:28:22.858-05	\N	\N
SV2112270484@@1-1	diagnostics show the display is defective, find my device is still active. contacting customer for an update.	2021-12-28 10:43:37-05	2021-12-28 14:24:47.922-05	2021-12-28 14:24:47.922-05	\N	\N
SV2112220606@@1-2	customer has approved repair . part is on order . customer has provided an updated contact number - 917 960 5189	2021-12-27 15:31:01-05	2021-12-28 14:24:51.506-05	2021-12-28 14:24:51.506-05	\N	\N
SV2112220587@@1-1	Reinstalled OS with drivers, data was not needed. Notified them unit was ready and recommmeded MCA	2021-12-27 18:49:48-05	2021-12-28 14:24:53.708-05	2021-12-28 14:24:53.708-05	\N	\N
SV2112170770@@1-1	unit has passed diagnostics. the hard drive health is rated at 67% . recommending the hard drive be replaced *(apple replacement hard drive)	2021-12-17 19:50:44-05	2021-12-23 12:56:15.573-05	2021-12-23 12:56:15.573-05	\N	\N
\.


--
-- Data for Name: Materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Materials" (id, cost, price, "createdAt", "updatedAt", description, vendor, class, serialized, "isInventory", "searchKey") FROM stdin;
SP-S000604	0.00	0.00	2021-12-28 17:31:14.563-05	2021-12-28 17:31:14.563-05	Microsoft Office Home and Student V2	MICROSOFT	SB	f	f	000604
SP-S000653	0.00	0.00	2021-12-28 17:31:14.572-05	2021-12-28 17:31:14.572-05	Microsoft Office Mac Home and Business V2	MICROSOFT	SB	f	f	000653
SP-S000687	0.00	0.00	2021-12-28 17:31:14.574-05	2021-12-28 17:31:14.574-05	Microsoft Office Mac Home Student V2	MICROSOFT	SB	f	f	000687
SP-S001701	0.00	0.00	2021-12-28 17:31:14.575-05	2021-12-28 17:31:14.575-05	WD BLUE SN500 250G NVME	IPSG	Notebook	f	t	001701
SP-S005066	0.00	0.00	2021-12-28 17:31:14.6-05	2021-12-28 17:31:14.6-05	EVGA 16GB 2 x 8GB DDR4-2400 PC4-19200 CL15 Desktop Memory	IPSG	Desktop Computer	f	t	005066 959064
SP-S002758	0.00	0.00	2021-12-28 17:31:14.602-05	2021-12-28 17:31:14.602-05	RYZEN 7 2700X Core return	IPSG	Desktop Computer	f	t	002758   741173
SP-S005587	0.00	0.00	2021-12-28 17:31:14.604-05	2021-12-28 17:31:14.604-05	ASUS Z170 Pro Gaming LGA 1151 ATX	IPSG	Desktop Computer	f	t	005587 837419
SP-S006692	0.00	0.00	2021-12-28 17:31:14.605-05	2021-12-28 17:31:14.605-05	Intel Core i3-6100 CI3 3.7GHz LGA 1151 	IPSG	Desktop Computer	f	t	006692
SP-S007203	0.00	0.00	2021-12-28 17:31:14.611-05	2021-12-28 17:31:14.611-05	CPU, i5 3470 3.2GHz SKT1155	POWERSPEC	Desktop Computer	f	t	S007203
SP-S007443	0.00	0.00	2021-12-28 17:31:14.612-05	2021-12-28 17:31:14.612-05	16X BLACK DVD-ROM	IPSG	DVD Rom Drive	f	t	S007443
SP-S011015	0.00	0.00	2021-12-28 17:31:14.613-05	2021-12-28 17:31:14.613-05	ASR B365 PRO 4	IPSG	Desktop Computer	f	t	011015 EOL 081869
SP-S010538	0.00	0.00	2021-12-28 17:31:14.615-05	2021-12-28 17:31:14.615-05	ASUS_DUAL_RTX_2070_SUPER Core RTN	IPSG	Desktop Computer	f	t	010538 EOL
SP-S012625	0.00	0.00	2021-12-28 17:31:14.619-05	2021-12-28 17:31:14.619-05	G.Skill DDR4 3200 16GB (2x8)	IPSG	Desktop Computer	f	t	012625
SP-S012641	0.00	0.00	2021-12-28 17:31:14.62-05	2021-12-28 17:31:14.62-05	Corsair DDR4 3200 16GB (2x8)	IPSG	Desktop Computer	f	t	012641
SP-S016964	0.00	0.00	2021-12-28 17:31:14.621-05	2021-12-28 17:31:14.621-05	2.8G C2D E7400 775 1066FSB 3MB	IPSG	Desktop Computer	f	t	S016964
SP-S022228	0.00	0.00	2021-12-28 17:31:14.622-05	2021-12-28 17:31:14.622-05	XP PRO SP3 XPP 1.3A POWERSPEC RECOV MEDIA DVD	IPSG	Desktop Computer	f	t	S022228
SP-S024935	0.00	0.00	2021-12-28 17:31:14.627-05	2021-12-28 17:31:14.627-05	Intel CI7-6700 Core i7 LGA 1151 3.4GHz	IPSG	Desktop Computer	f	t	024935 845545
SP-S027763	0.00	0.00	2021-12-28 17:31:14.63-05	2021-12-28 17:31:14.63-05	ATX Computer case 7670 (current retail SKU 059808)	POWERSPEC	Desktop Computer	f	t	S027763
SP-S024943	0.00	0.00	2021-12-28 17:31:14.631-05	2021-12-28 17:31:14.631-05	ASRock Z170M ITX/ac	IPSG	Desktop Computer	f	t	024943 retail: 820928
SP-S029371	0.00	0.00	2021-12-28 17:31:14.633-05	2021-12-28 17:31:14.633-05	BLK CRX320EE-B2 52XW 32XRW 16XDVD IDE	IPSG	Combo Drive	f	t	S029371
SP-S029496	0.00	0.00	2021-12-28 17:31:14.639-05	2021-12-28 17:31:14.639-05	1GB PC4200 DDR2-533	IPSG	Memory Module	f	t	S029496
SP-S030684	0.00	0.00	2021-12-28 17:31:14.642-05	2021-12-28 17:31:14.642-05	2.0GHZ A64-3200+ SK939 512K  ADA3200DAA4BW	AMD	Desktop Computer	f	t	S030684
SP-S032490	0.00	0.00	2021-12-28 17:31:14.642-05	2021-12-28 17:31:14.642-05	SAMSUNG SH-W162Z/BEBN 8XDL 16XW 8XRW IDE BLK	IPSG	DVDRW Drive	f	t	S032490
SP-S035634	0.00	0.00	2021-12-28 17:31:14.643-05	2021-12-28 17:31:14.643-05	Microsoft Office 365 Home V2	MICROSOFT	SB	f	f	035634
SP-S035667	0.00	0.00	2021-12-28 17:31:14.651-05	2021-12-28 17:31:14.651-05	Microsoft Office 365 Personal V2	MICROSOFT	SB	f	f	035667
SP-S041178	0.00	0.00	2021-12-28 17:31:14.651-05	2021-12-28 17:31:14.651-05	TOSH 2TB 3.5" 7200RPM HDD DT01ACA200	IPSG	Hard Drives	f	t	S041178
SP-S041582	0.00	0.00	2021-12-28 17:31:14.652-05	2021-12-28 17:31:14.652-05	333MHZ CELERON SEPP/S1	Intel	Desktop Computer	f	t	S041582
SP-S041855	0.00	0.00	2021-12-28 17:31:14.653-05	2021-12-28 17:31:14.653-05	16GB DDR4 3200 UDIMM CL16 CORE	IPSG	Desktop Computer	f	t	041855
SP-S042895	0.00	0.00	2021-12-28 17:31:14.657-05	2021-12-28 17:31:14.657-05	OEM, Windows 8 64-Bit (Full Version)	Retail	Notebook	f	t	042895
SP-S047670	0.00	0.00	2021-12-28 17:31:14.659-05	2021-12-28 17:31:14.659-05	TRENDTCH AC1200 PCIE	ipsg	Desktop Computer	f	t	047670
sp-S048231	0.00	0.00	2021-12-28 17:31:14.66-05	2021-12-28 17:31:14.66-05	2GB PC3-8500 DDR3-1066	Powerspec	Memory Module	f	t	S048231
SP-S048777	0.00	0.00	2021-12-28 17:31:14.66-05	2021-12-28 17:31:14.66-05	3.06GHZ CELD346 533FSB SK775 256K  SL7TY	IPSG	Desktop Computer	f	t	S048777
SP-S049932	0.00	0.00	2021-12-28 17:31:14.664-05	2021-12-28 17:31:14.664-05	DDR4 4GB 2400 Desktop	IPSG	Desktop Computer	f	t	049932
SP-S051136	0.00	0.00	2021-12-28 17:31:14.665-05	2021-12-28 17:31:14.665-05	ASRock B450M/AC AMD AM4 Socket	IPSG	Desktop Computer	f	t	051136  081877
SP-S051698	0.00	0.00	2021-12-28 17:31:14.666-05	2021-12-28 17:31:14.666-05	AMD Radeon R9-390X 8GB	IPSG	Desktop Computer	f	t	S051698
SP-S051938	0.00	0.00	2021-12-28 17:31:14.667-05	2021-12-28 17:31:14.667-05	ZOTAC RTX 2070 SUPER MINI	IPSG	Desktop Computer	f	t	051938 EOL
SP-S05513	0.00	0.00	2021-12-28 17:31:14.67-05	2021-12-28 17:31:14.67-05	winbook v410 thermal module	WINBOOK	Notebook	f	t	s05513
SP-S059444	0.00	0.00	2021-12-28 17:31:14.672-05	2021-12-28 17:31:14.672-05	300GB 7200RPM 3.5 IDE 8M (P/N 300G-3.5DT7200)	Samsung	Hard Drives	f	t	S059444
SP-S06	0.00	0.00	2021-12-28 17:31:14.673-05	2021-12-28 17:31:14.673-05	14.0" WideScreen, HD+ (1600x900), Matte	LAPTOPSCREENS	Notebook	f	t	S06
SP-S060939	0.00	0.00	2021-12-28 17:31:14.674-05	2021-12-28 17:31:14.674-05	250G 7200RPM 3.5 IDE 8M (P/N 250G-3.5DT7200)	IPSG	Hard Drives	f	t	S060939
SP-S063982	0.00	0.00	2021-12-28 17:31:14.677-05	2021-12-28 17:31:14.677-05	MASTERLIQUID ML240L RGB B	IPSG	Desktop Computer	f	t	063982
SP-S064956	0.00	0.00	2021-12-28 17:31:14.679-05	2021-12-28 17:31:14.679-05	SERVICE ESET NOD32 Version 6 Upgrade 3-USER lic. (064956)	ESET	Desktop Computer	f	t	S064956
SP-S064956-1	0.00	0.00	2021-12-28 17:31:14.681-05	2021-12-28 17:31:14.681-05	ESET NOD32 Version 7 Upgrade 1Year 3PC lic. (064956)	ESET	Desktop Computer	f	t	S064956-1
SP-S065359	0.00	0.00	2021-12-28 17:31:14.682-05	2021-12-28 17:31:14.682-05	HYPER 212 RGB BLACK BULK	IPSG	Desktop Computer	f	t	065359
SP-S065417	0.00	0.00	2021-12-28 17:31:14.684-05	2021-12-28 17:31:14.684-05	CI5 9400 R0 Processor	IPSG	Desktop Computer	f	t	065417
SP-S065508	0.00	0.00	2021-12-28 17:31:14.687-05	2021-12-28 17:31:14.687-05	WD BLUE SN550 500G NVME	IPSG	Desktop Computer	f	t	065508
SP-S065516	0.00	0.00	2021-12-28 17:31:14.688-05	2021-12-28 17:31:14.688-05	WD BLUE SN550 1TB M.2 NVME Core	IPSG	Desktop Computer	f	t	065516
SP-S066621	0.00	0.00	2021-12-28 17:31:14.689-05	2021-12-28 17:31:14.689-05	ESET Cybersecurity for Mac (641316)	ESET	Desktop Computer	f	t	S066621
SP-S068874	0.00	0.00	2021-12-28 17:31:14.693-05	2021-12-28 17:31:14.693-05	INTEL D101GGCL AT1 X200 S775 SYSTEM BOARD	IPSG	Desktop Computer	f	t	S068874
SP-S069849	0.00	0.00	2021-12-28 17:31:14.694-05	2021-12-28 17:31:14.694-05	240GB SSD PLUS	SANDISK	Notebook	f	t	SSD
SP-S070128	0.00	0.00	2021-12-28 17:31:14.695-05	2021-12-28 17:31:14.695-05	CSM-H87M-G43 mATX 1150	POWERSPEC	Desktop Computer	f	t	S070128
SP-S070425	0.00	0.00	2021-12-28 17:31:14.697-05	2021-12-28 17:31:14.697-05	Intel OEM G3900	IPSG	Desktop Computer	f	t	070425
SP-S073411	0.00	0.00	2021-12-28 17:31:14.7-05	2021-12-28 17:31:14.7-05	Video Card, GTX 760 2GB OC	POWERSPEC	Desktop Computer	f	t	073411
SP-S074237	0.00	0.00	2021-12-28 17:31:14.702-05	2021-12-28 17:31:14.702-05	BLK DVD+/-RW DL W/ NERO DWG120AB2 8XDL 16XW 8XRW	IPSG	DVDRW Drive	f	t	S074237
SP-S077297	0.00	0.00	2021-12-28 17:31:14.704-05	2021-12-28 17:31:14.704-05	LG 16X SATA BD BURNER	IPSG	DVD Rom Drive	f	t	S077297 090761
SP-S078378	0.00	0.00	2021-12-28 17:31:14.705-05	2021-12-28 17:31:14.705-05	2.8GHZ CEL 400FSB SK478 128K SL77T	IPSG	Desktop Computer	f	t	S078378
SP-S08	0.00	0.00	2021-12-28 17:31:14.711-05	2021-12-28 17:31:14.711-05	S08 LCD 14.0 MT 1366x768 LVDS Slim HB140WX1-300 Std	Laptopscreens	Notebook	f	t	S08
SP-S081851	0.00	0.00	2021-12-28 17:31:14.714-05	2021-12-28 17:31:14.714-05	ASUS PRIME Z390-P Core RTN XA4J	IPSG	Desktop Computer	f	t	081851 826602
SP-S089938	0.00	0.00	2021-12-28 17:31:14.717-05	2021-12-28 17:31:14.717-05	ASUS P5N-E SLI MTHRBRD NVIDIA 650I (SKU 112755)	IPSG	Desktop Computer	f	t	S089938
SP-S089615	0.00	0.00	2021-12-28 17:31:14.717-05	2021-12-28 17:31:14.717-05	NIVIDIA RX5700 FIGHTING 8G OC	IPSG	Desktop Computer	f	t	089615 983064
SP-S092452	0.00	0.00	2021-12-28 17:31:14.718-05	2021-12-28 17:31:14.718-05	RYZEN 5 3400G MPK Core RTN	IPSG	Desktop Computer	f	t	092452
SP-S100412	0.00	0.00	2021-12-28 17:31:14.727-05	2021-12-28 17:31:14.727-05	MSI GeForce GTX 1080 GAMING X 8GB	IPSG	Desktop Computer	f	t	100412
SP-S109397	0.00	0.00	2021-12-28 17:31:14.734-05	2021-12-28 17:31:14.734-05	Micron M600 512GB M.2 SSD	IPSG	Desktop Computer	f	t	SP-S109397
SP-S113738	0.00	0.00	2021-12-28 17:31:14.743-05	2021-12-28 17:31:14.743-05	2.2GHZ ATH64 3500+ SKT939 ADA3500DAA4BW	IPSG	Desktop Computer	f	t	S113738
SP-S114645	0.00	0.00	2021-12-28 17:31:14.75-05	2021-12-28 17:31:14.75-05	OEM CI5 10400 Q0 Core RTN	IPSG	Desktop Computer	f	t	114645
SP-S098996	0.00	0.00	2021-12-28 17:31:14.721-05	2021-12-28 17:31:14.721-05	ZOTAC GTX 1660 SUPER Core RTN	IPSG	Desktop Computer	f	t	098996
SP-S106070	0.00	0.00	2021-12-28 17:31:14.73-05	2021-12-28 17:31:14.73-05	ROG STRIX Z490-E GAMING	IPSG	Desktop Computer	f	t	106070
sp-s110098	0.00	0.00	2021-12-28 17:31:14.737-05	2021-12-28 17:31:14.737-05	2.6GHz E3400 Skt 775 1MB 45nm (SKU 110098)	Powerspec	Desktop Computer	f	t	S110098
SP-S114090	0.00	0.00	2021-12-28 17:31:14.744-05	2021-12-28 17:31:14.744-05	2.4GHZ A64-4000+ SK939 ADA4000DAA5BN	IPSG	Desktop Computer	f	t	S114090
SP-S114686	0.00	0.00	2021-12-28 17:31:14.752-05	2021-12-28 17:31:14.752-05	OEM CI7 10700 Core RTN	IPSG	Desktop Computer	f	t	114686
SP-S100396	0.00	0.00	2021-12-28 17:31:14.725-05	2021-12-28 17:31:14.725-05	MSI GTX 1070 Gaming X	IPSG	Desktop Computer	f	t	100396
SP-S106112	0.00	0.00	2021-12-28 17:31:14.733-05	2021-12-28 17:31:14.733-05	Video Card, GT 620 1024MB DDR3	POWERSPEC	Desktop Computer	f	t	S106112
SP-S110544	0.00	0.00	2021-12-28 17:31:14.74-05	2021-12-28 17:31:14.74-05	EVO 750 500G	IPSG	Desktop Computer	f	t	110544
SP-S114553	0.00	0.00	2021-12-28 17:31:14.748-05	2021-12-28 17:31:14.748-05	MBD-X10SLL-F SUPERMICOR	Powerspec	Desktop Computer	f	t	S114553 431612
SP-S114694	0.00	0.00	2021-12-28 17:31:14.753-05	2021-12-28 17:31:14.753-05	Intel Core i7-10700K (SRH72) CORE-RTN	IPSG	Desktop Computer	f	t	114694
SP-S100388	0.00	0.00	2021-12-28 17:31:14.726-05	2021-12-28 17:31:14.726-05	32GB 2X16 D4 3600 CL16 RJ Core RTN	IPSG	Desktop Computer	f	t	100388
SP-S108142	0.00	0.00	2021-12-28 17:31:14.734-05	2021-12-28 17:31:14.734-05	1.6GHZ YONAH T2300 (P60 & T230) WINBOOK	IPSG	Notebook	f	t	S108142
SP-S113035	0.00	0.00	2021-12-28 17:31:14.742-05	2021-12-28 17:31:14.742-05	ZOTAC 1070 AMP	IPSG	Desktop Computer	f	t	113035
SP-S114637	0.00	0.00	2021-12-28 17:31:14.749-05	2021-12-28 17:31:14.749-05	EOL ASROCK RADEON RX580 8GB CORE	IPSG	Desktop Computer	f	t	114637
SP-S000596	0.00	0.00	2021-12-28 17:31:14.559-05	2021-12-28 17:31:14.559-05	Microsoft Office Home and Business V2	MICROSOFT	SB	f	f	000596
SP-S007138	0.00	0.00	2021-12-28 17:31:14.602-05	2021-12-28 17:31:14.602-05	Micron 960GB SSD	IPSG	Desktop Computer	f	t	007138
SP-S010512	0.00	0.00	2021-12-28 17:31:14.613-05	2021-12-28 17:31:14.613-05	POWERCOLOR RX 580 8GB	IPSG	Desktop Computer	f	t	010512 154534
SP-S012682	0.00	0.00	2021-12-28 17:31:14.62-05	2021-12-28 17:31:14.62-05	EVGA GQ 1000 watt	IPSG	Desktop Computer	f	t	012682 944744
SP-S027664	0.00	0.00	2021-12-28 17:31:14.629-05	2021-12-28 17:31:14.629-05	Motherboard, Intel DQ77MK	POWERSPEC	Desktop Computer	f	t	S027664
SP-S03	0.00	0.00	2021-12-28 17:31:14.64-05	2021-12-28 17:31:14.64-05	S03 LCD 14.0 GL 1366x768 LVDS Square LP140WH4(TL)(A1) Std	Laptopscreens	Notebook	f	t	S03
SP-S04	0.00	0.00	2021-12-28 17:31:14.648-05	2021-12-28 17:31:14.648-05	S04 LCD 14.0 GL 1366x768 LVDS Slim HB140WX1-300 Std	Laptopscreens	Notebook	f	t	S04
SP-S042564	0.00	0.00	2021-12-28 17:31:14.656-05	2021-12-28 17:31:14.656-05	2.5G C2D E5200 775 800FSB 2MB	IPSG	Desktop Computer	f	t	S042564
SP-S049437	0.00	0.00	2021-12-28 17:31:14.663-05	2021-12-28 17:31:14.663-05	N660Ti PE 2GD5/OC GeForce GTX 660 	MSI	Desktop Computer	f	t	S049437
SP-S052357	0.00	0.00	2021-12-28 17:31:14.669-05	2021-12-28 17:31:14.669-05	RADEON 480GB SSD R3 SERIES	IPSG	Desktop Computer	f	t	052357
SP-S061440	0.00	0.00	2021-12-28 17:31:14.676-05	2021-12-28 17:31:14.676-05	Toshiba 2TB 3.5 7200RPM HDD	IPSG	Desktop Computer	f	t	061440
SP-S065375	0.00	0.00	2021-12-28 17:31:14.684-05	2021-12-28 17:31:14.684-05	HYPER 212S INTEL BRK BULK	IPSG	Desktop Computer	f	t	065375
SP-S066795	0.00	0.00	2021-12-28 17:31:14.692-05	2021-12-28 17:31:14.692-05	3.06GHZ 533FSB SK775 1M SL8JA	IPSG	Desktop Computer	f	t	S066795
SP-S071522	0.00	0.00	2021-12-28 17:31:14.698-05	2021-12-28 17:31:14.698-05	RYZEN 5 3400G BOX	IPSG	Desktop Computer	f	t	071522
SP-S078519	0.00	0.00	2021-12-28 17:31:14.713-05	2021-12-28 17:31:14.713-05	EVGA SuperNOVA 750 750W Watt Bronze ATX	EVGA	Desktop Computer	f	t	078519 911743
sp-s095117	0.00	0.00	2021-12-28 17:31:14.718-05	2021-12-28 17:31:14.718-05	3.2GHZ I3-550 Skt 1156 4MB 32nm SKU 095117	Powerspec	Desktop Computer	f	t	S095117
SP-S104695	0.00	0.00	2021-12-28 17:31:14.729-05	2021-12-28 17:31:14.729-05	3.5" TO 2.5" BAY CNVRTER  (SKU 104695	Powerspec	Hard Drives	f	t	S104695
SP-S109413	0.00	0.00	2021-12-28 17:31:14.735-05	2021-12-28 17:31:14.735-05	SAMSUNG EVO 750 250G	IPSG	Desktop Computer	f	t	109413 032862
SP-S113746	0.00	0.00	2021-12-28 17:31:14.742-05	2021-12-28 17:31:14.742-05	1.8GHZ SEMPRON 3100+ SKT754	IPSG	Desktop Computer	f	t	S113746
SP-S114561	0.00	0.00	2021-12-28 17:31:14.749-05	2021-12-28 17:31:14.749-05	MBD-X10SLA-F SUPERMICRO	POWERSPEC	Desktop Computer	f	t	S114561
SP-S114702	0.00	0.00	2021-12-28 17:31:14.757-05	2021-12-28 17:31:14.757-05	CPU CI9 10900K	IPSG	Desktop Computer	f	t	114702
\.


--
-- Data for Name: OrderAudits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderAudits" (id, location, order_id, status, name, "createdAt", "updatedAt") FROM stdin;
37	b1	SV2106180120@@1	3	Audit_12/17/21	2021-12-17 17:06:26.619-05	2021-12-17 17:06:29.583-05
7	a1	SV2109140414@@1	1	Audit_12/17/21	2021-12-17 16:13:02.861-05	2021-12-17 16:13:02.861-05
16	a2	SV2112150236@@1\t	1	Audit_12/17/21	2021-12-17 16:18:36.735-05	2021-12-17 16:18:36.735-05
38	b2	RP2011210121@@1	3	Audit_12/17/21	2021-12-17 17:06:32.797-05	2021-12-17 17:06:36.498-05
39	b2	SV2110110444@@1	3	Audit_12/17/21	2021-12-17 17:06:34.83-05	2021-12-17 17:06:38.99-05
9	a1	SV2101210135@@1	1	Audit_12/17/21	2021-12-17 16:13:04.187-05	2021-12-17 16:54:47.697-05
42	b2	SV2111220869@@1	1	Audit_12/17/21	2021-12-17 17:06:40.231-05	2021-12-17 17:06:40.25-05
41	b2	SV2111050105	3	Audit_12/17/21	2021-12-17 17:06:38.813-05	2021-12-17 17:06:42.967-05
43	b2	SV2105060474@@1	3	Audit_12/17/21	2021-12-17 17:06:41.359-05	2021-12-17 17:06:45.032-05
2	a1	SV2112010453@@1	0	Audit_12/17/21	2021-12-17 15:49:46.422-05	2021-12-17 16:58:45.675-05
12	a2	SV2112150634@@1	0	Audit_12/17/21	2021-12-17 16:13:09.447-05	2021-12-17 16:59:02.02-05
44	b2	SV2112140214@@1	0	Audit_12/17/21	2021-12-17 17:06:46.809-05	2021-12-17 17:06:46.809-05
45	b2	SV2112140214@@1	1	Audit_12/17/21	2021-12-17 17:06:46.813-05	2021-12-17 17:06:46.813-05
3	a1	SV2112010453@@1	1	Audit_12/17/21	2021-12-17 15:49:46.429-05	2021-12-17 17:04:47.574-05
4	a1	SV2109250507	3	Audit_12/17/21	2021-12-17 15:49:49.208-05	2021-12-17 17:04:53.464-05
6	a1	SV2109140414@@1	3	Audit_12/17/21	2021-12-17 16:13:02.858-05	2021-12-17 17:04:55.467-05
8	a1	SV2101210135@@1	3	Audit_12/17/21	2021-12-17 16:13:04.185-05	2021-12-17 17:04:57.028-05
63	c0	SV2111050486@@1	3	Audit_12/17/21	2021-12-17 17:16:58.238-05	2021-12-17 17:17:02.062-05
40	b2	SV2102100751	0	Audit_12/17/21	2021-12-17 17:06:36.519-05	2021-12-17 17:06:49.348-05
11	a2	SV2110040736	0	Audit_12/17/21	2021-12-17 16:13:07.501-05	2021-12-17 17:05:36.284-05
13	a2	SV2112150634@@1	1	Audit_12/17/21	2021-12-17 16:13:09.454-05	2021-12-17 17:05:37.375-05
10	a2	SV2105240334	3	Audit_12/17/21	2021-12-17 16:13:06.631-05	2021-12-17 17:05:38.6-05
14	a2	SV2107190291@@1	3	Audit_12/17/21	2021-12-17 16:13:09.924-05	2021-12-17 17:05:41.488-05
19	a3	SV2112040569@@1	0	Audit_12/17/21	2021-12-17 17:05:43.241-05	2021-12-17 17:05:43.241-05
20	a3	SV2112040569@@1	1	Audit_12/17/21	2021-12-17 17:05:43.243-05	2021-12-17 17:05:43.243-05
21	a3	SV2112150236@@1	0	Audit_12/17/21	2021-12-17 17:05:43.935-05	2021-12-17 17:05:43.935-05
22	a3	SV2112150236@@1	1	Audit_12/17/21	2021-12-17 17:05:43.938-05	2021-12-17 17:05:43.938-05
18	a3	SV211129088@@1	3	Audit_12/17/21	2021-12-17 17:05:41.431-05	2021-12-17 17:05:45.037-05
23	a4	SV2110080059@@1	3	Audit_12/17/21	2021-12-17 17:05:46.977-05	2021-12-17 17:05:50.887-05
24	a4	SV2108190270@@1	3	Audit_12/17/21	2021-12-17 17:05:48.971-05	2021-12-17 17:05:52.97-05
25	a4	SV2108110123@@1	3	Audit_12/17/21	2021-12-17 17:05:49.765-05	2021-12-17 17:05:53.643-05
26	a5	SV2109100593@@1	3	Audit_12/17/21	2021-12-17 17:05:54.404-05	2021-12-17 17:05:58.358-05
27	a5	SV2108030250@@1	3	Audit_12/17/21	2021-12-17 17:05:55.671-05	2021-12-17 17:05:59.268-05
28	a5	SV2110080070@@1	3	Audit_12/17/21	2021-12-17 17:05:56.698-05	2021-12-17 17:06:00.404-05
29	a6	SV2109170549@@1	3	Audit_12/17/21	2021-12-17 17:05:59.288-05	2021-12-17 17:06:02.789-05
30	a6	SV2109160237@@1	3	Audit_12/17/21	2021-12-17 17:06:00.156-05	2021-12-17 17:06:06.151-05
31	a6	SV2108290441@@1	3	Audit_12/17/21	2021-12-17 17:06:01.494-05	2021-12-17 17:06:07.848-05
35	a6	SV2110310545@@1	1	Audit_12/17/21	2021-12-17 17:06:08.511-05	2021-12-17 17:06:09.099-05
32	a6	SV2107180348	3	Audit_12/17/21	2021-12-17 17:06:03.627-05	2021-12-17 17:06:10.23-05
33	a6	SV2108020361@@1	3	Audit_12/17/21	2021-12-17 17:06:05.8-05	2021-12-17 17:06:12.987-05
34	a6	SV2110130267@@1	3	Audit_12/17/21	2021-12-17 17:06:07.055-05	2021-12-17 17:06:13.954-05
36	b1	SV2109060725@@1	3	Audit_12/17/21	2021-12-17 17:06:22.837-05	2021-12-17 17:06:28.886-05
47	b3	SV2112050416@@1	1	Audit_12/17/21	2021-12-17 17:06:54.212-05	2021-12-17 17:06:54.229-05
46	b3	sv21112110397@@1	3	Audit_12/17/21	2021-12-17 17:06:52.553-05	2021-12-17 17:06:56.204-05
49	b4	SV2110280609@@1	0	Audit_12/17/21	2021-12-17 17:06:57.084-05	2021-12-17 17:06:57.084-05
50	b4	SV2110280609@@1	1	Audit_12/17/21	2021-12-17 17:06:57.089-05	2021-12-17 17:06:57.089-05
48	b4	SV2109250401@@1	3	Audit_12/17/21	2021-12-17 17:06:56.172-05	2021-12-17 17:07:00.085-05
52	b5	sv2111230645@@1	0	Audit_12/17/21	2021-12-17 17:07:00.111-05	2021-12-17 17:07:00.111-05
53	b5	sv2111230645@@1	1	Audit_12/17/21	2021-12-17 17:07:00.115-05	2021-12-17 17:07:00.115-05
54	b5	SV2111220393@@1	1	Audit_12/17/21	2021-12-17 17:07:01.171-05	2021-12-17 17:07:01.171-05
55	b5	SV2111220393@@1	0	Audit_12/17/21	2021-12-17 17:07:01.174-05	2021-12-17 17:07:01.174-05
51	b4	SV2106030205@@1	3	Audit_12/17/21	2021-12-17 17:06:58.122-05	2021-12-17 17:07:01.672-05
56	b5	SV2111170293@@1	0	Audit_12/17/21	2021-12-17 17:07:07.003-05	2021-12-17 17:07:07.003-05
57	b5	SV2111170293@@1	1	Audit_12/17/21	2021-12-17 17:07:07.005-05	2021-12-17 17:07:07.005-05
58	b6	2222222222222220253@@1	3	Audit_12/17/21	2021-12-17 17:16:39.737-05	2021-12-17 17:16:42.891-05
59	b6	SV2107250412@@1	3	Audit_12/17/21	2021-12-17 17:16:41.23-05	2021-12-17 17:16:44.585-05
60	b6	SV2110170582@@1	3	Audit_12/17/21	2021-12-17 17:16:42.595-05	2021-12-17 17:16:45.908-05
61	b6	90652@@1	3	Audit_12/17/21	2021-12-17 17:16:49.449-05	2021-12-17 17:16:53.097-05
62	b6	SV2103200271@@1	3	Audit_12/17/21	2021-12-17 17:16:51.31-05	2021-12-17 17:16:55.377-05
64	c0	SV2111140259@@1	1	Audit_12/17/21	2021-12-17 17:17:04.271-05	2021-12-17 17:17:04.289-05
66	c0	SV2111120729@@1	1	Audit_12/17/21	2021-12-17 17:17:08.138-05	2021-12-17 17:17:08.154-05
65	c0	RP1506230286@@1	3	Audit_12/17/21	2021-12-17 17:17:06.116-05	2021-12-17 17:17:09.616-05
67	c1	SV2112070768@@1	1	Audit_12/17/21	2021-12-17 17:17:10.455-05	2021-12-17 17:17:10.471-05
68	c1	SV2112030546@@1	1	Audit_12/17/21	2021-12-17 17:17:12.957-05	2021-12-17 17:17:12.957-05
69	c1	SV2112030546@@1	0	Audit_12/17/21	2021-12-17 17:17:12.96-05	2021-12-17 17:17:12.96-05
70	c1	SV2112170369	3	Audit_12/17/21	2021-12-17 17:19:58.451-05	2021-12-17 17:19:58.451-05
71	c2	SV2112020346@@1	1	Audit_12/17/21	2021-12-17 17:20:06.451-05	2021-12-17 17:20:06.47-05
72	c2	SV2111040418@@1	1	Audit_12/17/21	2021-12-17 17:20:07.59-05	2021-12-17 17:20:07.59-05
73	c2	SV2111040418@@1	0	Audit_12/17/21	2021-12-17 17:20:07.593-05	2021-12-17 17:20:07.593-05
75	c3	SV2110290066@@1	1	Audit_12/17/21	2021-12-17 17:20:14.04-05	2021-12-17 17:20:14.058-05
74	c3	SV2107020115@@1	3	Audit_12/17/21	2021-12-17 17:20:12.507-05	2021-12-17 17:20:18.029-05
76	c3	SV2110111012@@1	3	Audit_12/17/21	2021-12-17 17:20:15.075-05	2021-12-17 17:20:21.419-05
79	c4	SV2111290891@@1	1	Audit_12/17/21	2021-12-17 17:20:23.144-05	2021-12-17 17:20:23.154-05
77	c4	SV2110250815@@1	3	Audit_12/17/21	2021-12-17 17:20:17.117-05	2021-12-17 17:20:23.49-05
78	c4	SV2109090598@@1	3	Audit_12/17/21	2021-12-17 17:20:17.959-05	2021-12-17 17:20:24.653-05
80	c5	SV2110310059@@1	0	Audit_12/17/21	2021-12-17 17:20:27.203-05	2021-12-17 17:20:27.203-05
81	c5	SV2110310059@@1	1	Audit_12/17/21	2021-12-17 17:20:27.209-05	2021-12-17 17:20:27.209-05
82	c5	SV2112100513@@1	1	Audit_12/17/21	2021-12-17 17:20:30.308-05	2021-12-17 17:20:30.308-05
83	c5	SV2112100513@@1	0	Audit_12/17/21	2021-12-17 17:20:30.311-05	2021-12-17 17:20:30.311-05
84	c5	SV2111120660@@1	1	Audit_12/17/21	2021-12-17 17:20:33.09-05	2021-12-17 17:20:33.111-05
85	c6	SV2111110395@@1	1	Audit_12/17/21	2021-12-17 17:20:38.152-05	2021-12-17 17:20:38.152-05
86	c6	SV2111110395@@1	0	Audit_12/17/21	2021-12-17 17:20:38.155-05	2021-12-17 17:20:38.155-05
15	X	SV2112160091@@3	1	Audit_12/17/21	2021-12-17 16:18:27.592-05	2021-12-17 17:33:54.654-05
1	FL	SV2110080032@@1	3	Audit_12/17/21	2021-12-17 15:46:31.412-05	2021-12-17 17:21:58.399-05
5	X	SV2112170034@@1	1	Audit_12/17/21	2021-12-17 16:12:32.642-05	2021-12-17 18:23:19.386-05
87	c6	SV2112050625@@1	0	Audit_12/17/21	2021-12-17 17:20:42.388-05	2021-12-17 17:20:42.49-05
88	c6	SV2112090588@@1	3	Audit_12/17/21	2021-12-17 17:20:45.35-05	2021-12-17 17:20:48.438-05
89	c7	SV2112130876@@1	0	Audit_12/17/21	2021-12-17 17:20:49.853-05	2021-12-17 17:20:49.853-05
90	c7	SV2112130876@@1	1	Audit_12/17/21	2021-12-17 17:20:49.856-05	2021-12-17 17:20:49.856-05
91	c7	SV2112140698@@1	0	Audit_12/17/21	2021-12-17 17:20:52.832-05	2021-12-17 17:20:52.832-05
92	c7	SV2112140698@@1	1	Audit_12/17/21	2021-12-17 17:20:52.835-05	2021-12-17 17:20:52.835-05
93	c8	SV2111120650@@1	1	Audit_12/17/21	2021-12-17 17:20:59.93-05	2021-12-17 17:20:59.94-05
94	c8	SV2112140605@@1	1	Audit_12/17/21	2021-12-17 17:21:05.4-05	2021-12-17 17:21:05.416-05
97	c8	SV2112080571@@1	0	Audit_12/17/21	2021-12-17 17:21:11.208-05	2021-12-17 17:21:11.208-05
98	c8	SV2112080571@@1	1	Audit_12/17/21	2021-12-17 17:21:11.212-05	2021-12-17 17:21:11.212-05
95	c8	SV2110210626@@1	3	Audit_12/17/21	2021-12-17 17:21:08.481-05	2021-12-17 17:21:11.886-05
96	c8	SV2107020183@@1	3	Audit_12/17/21	2021-12-17 17:21:10.126-05	2021-12-17 17:21:13.024-05
99	c8	SV2105250763@@1	3	Audit_12/17/21	2021-12-17 17:21:16.475-05	2021-12-17 17:21:19.949-05
100	C7	SV2111200735@@1	1	Audit_12/17/21	2021-12-17 17:21:36.465-05	2021-12-17 17:21:36.465-05
102	FL	SV2112110457@@1	1	Audit_12/17/21	2021-12-17 17:21:49.792-05	2021-12-17 17:21:49.803-05
17	FL	SV2112140141@@1	1	Audit_12/17/21	2021-12-17 16:18:41.602-05	2021-12-17 17:21:50.357-05
101	FL	SV2108100126@@1	3	Audit_12/17/21	2021-12-17 17:21:47.435-05	2021-12-17 17:21:50.784-05
103	FL	SV2111210726@@1	3	Audit_12/17/21	2021-12-17 17:21:51.452-05	2021-12-17 17:21:54.915-05
104	FL	SV2106150320@@1	3	Audit_12/17/21	2021-12-17 17:21:58.423-05	2021-12-17 17:22:01.422-05
134	X	SV2112040333	1	Audit_12/17/21	2021-12-17 17:58:48.916-05	2021-12-17 17:58:48.916-05
135	X	SV2112030628	1	Audit_12/17/21	2021-12-17 18:02:07.904-05	2021-12-17 18:02:07.904-05
118	X	SV2112120501@@1	1	Audit_12/17/21	2021-12-17 17:22:36.859-05	2021-12-17 18:22:12.973-05
136	CC	SV2112060602	1	Audit_12/17/21	2021-12-17 18:23:30.598-05	2021-12-17 18:23:30.598-05
137	X	SV2112030241	1	Audit_12/17/21	2021-12-17 18:26:18.835-05	2021-12-17 18:26:18.835-05
138	X	SV2112030142	1	Audit_12/17/21	2021-12-17 18:26:39.627-05	2021-12-17 18:26:39.627-05
139	X	SV2112020319	1	Audit_12/17/21	2021-12-17 18:31:47.397-05	2021-12-17 18:31:47.397-05
140	X	SV2112010350	1	Audit_12/17/21	2021-12-17 18:38:44.287-05	2021-12-17 18:38:44.287-05
105	GRAY	RP2105040043@@1	1	Audit_12/17/21	2021-12-17 17:22:01.963-05	2021-12-17 17:22:16.581-05
106	GRAY	SV2111260277@@1	1	Audit_12/17/21	2021-12-17 17:22:22.202-05	2021-12-17 17:22:22.202-05
107	GRAY	SV2111260277@@1	0	Audit_12/17/21	2021-12-17 17:22:22.205-05	2021-12-17 17:22:22.205-05
108	GRAY	RP1902230591@@1	3	Audit_12/17/21	2021-12-17 17:22:23.915-05	2021-12-17 17:22:28.482-05
109	GRAY	SV2110070450@@1	3	Audit_12/17/21	2021-12-17 17:22:24.721-05	2021-12-17 17:22:29.462-05
110	GRAY	SV2110220553@@1	3	Audit_12/17/21	2021-12-17 17:22:25.562-05	2021-12-17 17:22:30.445-05
111	GRAY	SV2110220547@@1	3	Audit_12/17/21	2021-12-17 17:22:26.184-05	2021-12-17 17:22:30.703-05
112	GRAY	SV2110050321@@1	3	Audit_12/17/21	2021-12-17 17:22:30.466-05	2021-12-17 17:22:33.633-05
113	GRAY	SV2109070226@@1	3	Audit_12/17/21	2021-12-17 17:22:31.239-05	2021-12-17 17:22:34.804-05
117	GRAY	sv2111280235@@1	1	Audit_12/17/21	2021-12-17 17:22:35.669-05	2021-12-17 17:22:35.912-05
114	GRAY	SV2109190287@@1	3	Audit_12/17/21	2021-12-17 17:22:32.5-05	2021-12-17 17:22:36.446-05
115	GRAY	SV2107070590@@1	3	Audit_12/17/21	2021-12-17 17:22:32.754-05	2021-12-17 17:22:36.763-05
159	a3	SV2112040569@@1	1	Audit_12/24/21	2021-12-24 15:52:22.815-05	2021-12-24 15:52:22.815-05
116	GRAY	SV2107070593@@1	3	Audit_12/17/21	2021-12-17 17:22:34.557-05	2021-12-17 17:22:37.941-05
120	GRAY	SV2112120253@@1	1	Audit_12/17/21	2021-12-17 17:30:10.689-05	2021-12-17 17:30:10.689-05
119	B6	SV2112120253@@1	1	Audit_12/17/21	2021-12-17 17:30:10.686-05	2021-12-17 17:30:25.354-05
121	X	SV2112130185@@1	1	Audit_12/17/21	2021-12-17 17:34:16.789-05	2021-12-17 17:34:16.789-05
122	X	SV2112120379	1	Audit_12/17/21	2021-12-17 17:35:25.648-05	2021-12-17 17:35:25.648-05
123	X	SV2112120726	1	Audit_12/17/21	2021-12-17 17:36:13.39-05	2021-12-17 17:36:13.39-05
124	D	SV2112110706	1	Audit_12/17/21	2021-12-17 17:37:54.152-05	2021-12-17 17:37:54.152-05
125	SD	SV2112110081@@1	1	Audit_12/17/21	2021-12-17 17:42:44.246-05	2021-12-17 17:42:44.246-05
126	B3	SV2112110397	1	Audit_12/17/21	2021-12-17 17:43:29.158-05	2021-12-17 17:43:29.158-05
127	SD	SV2112100353	1	Audit_12/17/21	2021-12-17 17:44:22.316-05	2021-12-17 17:44:22.316-05
128	CC	SV2112090039	1	Audit_12/17/21	2021-12-17 17:44:41.777-05	2021-12-17 17:44:41.777-05
129	SD	SV2112080494	1	Audit_12/17/21	2021-12-17 17:46:44.427-05	2021-12-17 17:46:44.427-05
130	X	SV2112080106	1	Audit_12/17/21	2021-12-17 17:48:20.477-05	2021-12-17 17:48:20.477-05
131	D	SV2112050561@@1	1	Audit_12/17/21	2021-12-17 17:54:54.239-05	2021-12-17 17:54:54.239-05
132	X	SV2112050547	1	Audit_12/17/21	2021-12-17 17:56:29.353-05	2021-12-17 17:56:29.353-05
133	SD	SV2112040653	1	Audit_12/17/21	2021-12-17 17:57:35.1-05	2021-12-17 17:57:35.1-05
141	X	SV2111300652	1	Audit_12/17/21	2021-12-17 18:41:52.222-05	2021-12-17 18:41:52.222-05
142	SD	SV2111300223@@1	1	Audit_12/17/21	2021-12-17 18:46:28.508-05	2021-12-17 18:46:28.508-05
143	X	SV2111290255@@1	1	Audit_12/17/21	2021-12-17 18:53:57.755-05	2021-12-17 18:53:57.755-05
144	X	SV2111290283@@1	1	Audit_12/17/21	2021-12-17 18:57:01.383-05	2021-12-17 18:57:01.383-05
145	SD	SV2111290652	1	Audit_12/17/21	2021-12-17 18:58:23.538-05	2021-12-17 18:58:23.538-05
146	SD	SV2111290732@@1	1	Audit_12/17/21	2021-12-17 18:59:35.63-05	2021-12-17 18:59:35.63-05
147	X	SV2111290880@@1	1	Audit_12/17/21	2021-12-17 19:01:40.475-05	2021-12-17 19:01:40.475-05
148	X	SV2111280580	1	Audit_12/17/21	2021-12-17 19:06:03.585-05	2021-12-17 19:06:03.585-05
149		SV2112190101@@1	\N	Audit_12/21/21	2021-12-21 10:54:05.721-05	2021-12-21 10:54:07.425-05
150	a1	SV2112200482@@1	3	Audit_12/24/21	2021-12-24 15:51:25.741-05	2021-12-24 15:51:26.399-05
151	a1	SV2109250507	3	Audit_12/24/21	2021-12-24 15:51:41.678-05	2021-12-24 15:51:43.317-05
152	a1	SV2109140414@@1	3	Audit_12/24/21	2021-12-24 15:51:42.792-05	2021-12-24 15:51:44.733-05
153	a1	SV2101210135@@1	3	Audit_12/24/21	2021-12-24 15:51:44.324-05	2021-12-24 15:51:45.925-05
154	a2	SV2105240334	3	Audit_12/24/21	2021-12-24 15:52:06.304-05	2021-12-24 15:52:11.118-05
155	a2	SV2110040736	3	Audit_12/24/21	2021-12-24 15:52:07.315-05	2021-12-24 15:52:11.147-05
156	a2	SV2107200270@@1	3	Audit_12/24/21	2021-12-24 15:52:10.732-05	2021-12-24 15:52:14.882-05
160	a3	SV2112040569@@1	0	Audit_12/24/21	2021-12-24 15:52:22.817-05	2021-12-24 15:52:22.817-05
157	a2	SV2107190291@@1	3	Audit_12/24/21	2021-12-24 15:52:18.191-05	2021-12-24 15:52:22.986-05
161	a3	SV2112150694@@1	0	Audit_12/24/21	2021-12-24 15:52:23.75-05	2021-12-24 15:52:23.755-05
158	a3	SV211129088@@1	3	Audit_12/24/21	2021-12-24 15:52:21.757-05	2021-12-24 15:52:25.161-05
162	a4	SV2110080059@@1	3	Audit_12/24/21	2021-12-24 15:52:26.524-05	2021-12-24 15:52:28.984-05
163	a4	SV2108190270@@1	3	Audit_12/24/21	2021-12-24 15:52:27.926-05	2021-12-24 15:52:29.502-05
164	a4	SV2108110123@@1	3	Audit_12/24/21	2021-12-24 15:52:28.72-05	2021-12-24 15:52:30.626-05
166	a5	SV2110080070@@1	1	Audit_12/24/21	2021-12-24 15:52:31.249-05	2021-12-24 15:52:31.552-05
165	a5	SV2108030250@@1	3	Audit_12/24/21	2021-12-24 15:52:30.627-05	2021-12-24 15:52:31.863-05
167	a6	SV2109170549@@1	3	Audit_12/24/21	2021-12-24 15:52:33.139-05	2021-12-24 15:52:34.383-05
168	a6	SV2109160237@@1	3	Audit_12/24/21	2021-12-24 15:52:35.643-05	2021-12-24 15:52:37.218-05
169	a6	SV2108290441@@1	3	Audit_12/24/21	2021-12-24 15:52:36.072-05	2021-12-24 15:52:37.904-05
170	a6	SV2107180348	3	Audit_12/24/21	2021-12-24 15:52:38.257-05	2021-12-24 15:52:40.532-05
172	a6	SV2110130267@@1	0	Audit_12/24/21	2021-12-24 15:52:41.713-05	2021-12-24 15:52:41.713-05
173	a6	SV2110130267@@1	1	Audit_12/24/21	2021-12-24 15:52:41.715-05	2021-12-24 15:52:41.715-05
171	a6	SV2108020361@@1	3	Audit_12/24/21	2021-12-24 15:52:40.5-05	2021-12-24 15:52:42.107-05
174	a6	SV2110310545@@1	1	Audit_12/24/21	2021-12-24 15:52:42.723-05	2021-12-24 15:52:43.029-05
175	b1	SV2112170568@@1	0	Audit_12/24/21	2021-12-24 15:52:48.597-05	2021-12-24 15:52:48.603-05
176	b1	SV2112120455@@1	3	Audit_12/24/21	2021-12-24 15:53:04.718-05	2021-12-24 15:53:06.588-05
177	b1	SV2109060725@@1	3	Audit_12/24/21	2021-12-24 15:53:05.958-05	2021-12-24 15:53:07.621-05
178	b1	SV2106180120@@1	3	Audit_12/24/21	2021-12-24 15:53:08.005-05	2021-12-24 15:53:09.913-05
179	b2	SV2110110444@@1	1	Audit_12/24/21	2021-12-24 15:53:11.36-05	2021-12-24 15:53:11.664-05
180	b2	SV2111220869@@1	1	Audit_12/24/21	2021-12-24 15:53:15.283-05	2021-12-24 15:53:15.283-05
181	b2	SV2111220869@@1	0	Audit_12/24/21	2021-12-24 15:53:15.285-05	2021-12-24 15:53:15.285-05
226	c4	SV2109090598@@1	3	Audit_12/24/21	2021-12-24 15:54:54.166-05	2021-12-24 15:54:55.696-05
183	b2	SV2112200432@@1	1	Audit_12/24/21	2021-12-24 15:53:23.81-05	2021-12-24 15:53:24.126-05
184	b2	SV2112210684@@1	1	Audit_12/24/21	2021-12-24 15:53:27.731-05	2021-12-24 15:53:27.731-05
185	b2	SV2112210684@@1	0	Audit_12/24/21	2021-12-24 15:53:27.733-05	2021-12-24 15:53:27.733-05
186	b2	SV2105060474@@1	3	Audit_12/24/21	2021-12-24 15:53:28.788-05	2021-12-24 15:53:32.898-05
182	b2	SV2102100751	1	Audit_12/24/21	2021-12-24 15:53:18.068-05	2021-12-24 15:53:35.065-05
187	b2	SV2112130217@@1	3	Audit_12/24/21	2021-12-24 15:53:33.136-05	2021-12-24 15:53:35.936-05
188	b3	SV2112190101@@1	1	Audit_12/24/21	2021-12-24 15:53:53.645-05	2021-12-24 15:53:53.938-05
189	b3	SV2112050416@@1	1	Audit_12/24/21	2021-12-24 15:53:54.661-05	2021-12-24 15:53:54.661-05
190	b3	SV2112050416@@1	0	Audit_12/24/21	2021-12-24 15:53:54.664-05	2021-12-24 15:53:54.664-05
192	b4	SV2110280609@@1	1	Audit_12/24/21	2021-12-24 15:53:57.749-05	2021-12-24 15:53:57.755-05
191	b4	SV2109250401@@1	3	Audit_12/24/21	2021-12-24 15:53:56.405-05	2021-12-24 15:53:58.359-05
193	b4	SV2106030205@@1	3	Audit_12/24/21	2021-12-24 15:53:58.724-05	2021-12-24 15:54:00.45-05
194	b5	SV2112140301@@1	1	Audit_12/24/21	2021-12-24 15:54:02.986-05	2021-12-24 15:54:03.291-05
195	b5	SV2112180236@@1	1	Audit_12/24/21	2021-12-24 15:54:06.546-05	2021-12-24 15:54:06.546-05
196	b5	SV2112180236@@1	0	Audit_12/24/21	2021-12-24 15:54:06.547-05	2021-12-24 15:54:06.547-05
197	b5	SV2111170293@@1	1	Audit_12/24/21	2021-12-24 15:54:11.21-05	2021-12-24 15:54:11.52-05
198	b6	SV2112190100@@1	0	Audit_12/24/21	2021-12-24 15:54:16.719-05	2021-12-24 15:54:16.719-05
199	b6	SV2112190100@@1	1	Audit_12/24/21	2021-12-24 15:54:16.719-05	2021-12-24 15:54:16.719-05
201	b6	SV2110170582@@1	1	Audit_12/24/21	2021-12-24 15:54:20.897-05	2021-12-24 15:54:20.897-05
202	b6	SV2110170582@@1	0	Audit_12/24/21	2021-12-24 15:54:20.897-05	2021-12-24 15:54:20.897-05
203	b6	sv2111290652@@1	0	Audit_12/24/21	2021-12-24 15:54:22.572-05	2021-12-24 15:54:22.574-05
200	b6	SV2107250412@@1	3	Audit_12/24/21	2021-12-24 15:54:19.113-05	2021-12-24 15:54:23.829-05
204	b6	SV2111210726@@1	3	Audit_12/24/21	2021-12-24 15:54:23.721-05	2021-12-24 15:54:26.004-05
205	b6	SV2103200271@@1	3	Audit_12/24/21	2021-12-24 15:54:24.549-05	2021-12-24 15:54:26.194-05
206	c0	SV2111120729@@1	1	Audit_12/24/21	2021-12-24 15:54:30.306-05	2021-12-24 15:54:30.306-05
207	c0	SV2111120729@@1	0	Audit_12/24/21	2021-12-24 15:54:30.307-05	2021-12-24 15:54:30.307-05
208	c0	SV2112100353@@1	1	Audit_12/24/21	2021-12-24 15:54:32.473-05	2021-12-24 15:54:32.778-05
209	c0	SV2111140259@@1	0	Audit_12/24/21	2021-12-24 15:54:34.851-05	2021-12-24 15:54:34.851-05
210	c0	SV2111140259@@1	1	Audit_12/24/21	2021-12-24 15:54:34.852-05	2021-12-24 15:54:34.852-05
211	c0	SV2111050486@@1	3	Audit_12/24/21	2021-12-24 15:54:36.116-05	2021-12-24 15:54:38.913-05
212	c1	SV2112070768@@1	1	Audit_12/24/21	2021-12-24 15:54:43.236-05	2021-12-24 15:54:43.537-05
213	c1	SV2112030546@@1	0	Audit_12/24/21	2021-12-24 15:54:44.511-05	2021-12-24 15:54:44.511-05
214	c1	SV2112030546@@1	1	Audit_12/24/21	2021-12-24 15:54:44.511-05	2021-12-24 15:54:44.511-05
216	c2	SV2112020346@@1	1	Audit_12/24/21	2021-12-24 15:54:47.535-05	2021-12-24 15:54:47.535-05
217	c2	SV2112020346@@1	0	Audit_12/24/21	2021-12-24 15:54:47.536-05	2021-12-24 15:54:47.536-05
215	c1	SV2112210486@@1	3	Audit_12/24/21	2021-12-24 15:54:45.671-05	2021-12-24 15:54:47.645-05
218	c2	SV2111040418@@1	0	Audit_12/24/21	2021-12-24 15:54:49.114-05	2021-12-24 15:54:49.114-05
219	c2	SV2111040418@@1	1	Audit_12/24/21	2021-12-24 15:54:49.115-05	2021-12-24 15:54:49.115-05
221	c3	SV2112200357@@1	0	Audit_12/24/21	2021-12-24 15:54:51.498-05	2021-12-24 15:54:51.498-05
222	c3	SV2112200357@@1	1	Audit_12/24/21	2021-12-24 15:54:51.499-05	2021-12-24 15:54:51.499-05
223	c3	SV2112200147@@1	1	Audit_12/24/21	2021-12-24 15:54:52.086-05	2021-12-24 15:54:52.086-05
224	c3	SV2112200147@@1	0	Audit_12/24/21	2021-12-24 15:54:52.087-05	2021-12-24 15:54:52.087-05
220	c3	SV2107020115@@1	3	Audit_12/24/21	2021-12-24 15:54:50.357-05	2021-12-24 15:54:53.78-05
225	c4	SV2110250815@@1	3	Audit_12/24/21	2021-12-24 15:54:53.779-05	2021-12-24 15:54:55.313-05
227	c4	SV2111290891@@1	1	Audit_12/24/21	2021-12-24 15:54:58.295-05	2021-12-24 15:54:58.596-05
228	c5	SV2110310059@@1	0	Audit_12/24/21	2021-12-24 15:55:02.185-05	2021-12-24 15:55:02.202-05
229	c5	SV2111120660@@1	1	Audit_12/24/21	2021-12-24 15:55:03.314-05	2021-12-24 15:55:03.619-05
230	c6	SV2111110395@@1	0	Audit_12/24/21	2021-12-24 15:55:06.123-05	2021-12-24 15:55:06.123-05
231	c6	SV2111110395@@1	1	Audit_12/24/21	2021-12-24 15:55:06.124-05	2021-12-24 15:55:06.124-05
232	c6	SV2112050625@@1	1	Audit_12/24/21	2021-12-24 15:55:07.168-05	2021-12-24 15:55:07.472-05
233	c6	SV2112090588@@1	0	Audit_12/24/21	2021-12-24 15:55:08.253-05	2021-12-24 15:55:08.259-05
234	c7	SV2112210899@@1	3	Audit_12/24/21	2021-12-24 15:55:09.799-05	2021-12-24 15:55:11.455-05
235	c7	SV2112140843@@1	3	Audit_12/24/21	2021-12-24 15:55:11.046-05	2021-12-24 15:55:12.285-05
236	c8	SV2111120650@@1	1	Audit_12/24/21	2021-12-24 15:55:18.42-05	2021-12-24 15:55:18.42-05
237	c8	SV2111120650@@1	0	Audit_12/24/21	2021-12-24 15:55:18.421-05	2021-12-24 15:55:18.421-05
238	c8	SV2110210626@@1	1	Audit_12/24/21	2021-12-24 15:55:19.105-05	2021-12-24 15:55:19.407-05
239	c8	SV2107020183@@1	3	Audit_12/24/21	2021-12-24 15:55:20.767-05	2021-12-24 15:55:22.092-05
240	c8	SV2112200939@@1	0	Audit_12/24/21	2021-12-24 15:55:22.396-05	2021-12-24 15:55:22.396-05
241	c8	SV2112200939@@1	1	Audit_12/24/21	2021-12-24 15:55:22.397-05	2021-12-24 15:55:22.397-05
244	gray	SV2110220547@@1	1	Audit_12/24/21	2021-12-24 15:55:46.132-05	2021-12-24 15:55:46.439-05
245	gray	SV2110220553@@1	0	Audit_12/24/21	2021-12-24 15:55:51.887-05	2021-12-24 15:55:51.887-05
246	gray	SV2110220553@@1	1	Audit_12/24/21	2021-12-24 15:55:51.888-05	2021-12-24 15:55:51.888-05
247	gray	SV2110070450@@1	1	Audit_12/24/21	2021-12-24 15:55:52.152-05	2021-12-24 15:55:52.457-05
242	gray	SV2105250763@@1	1	Audit_12/24/21	2021-12-24 15:55:24.434-05	2021-12-24 15:55:33.541-05
243	gray	SV2112150294@@1	1	Audit_12/24/21	2021-12-24 15:55:45.133-05	2021-12-24 15:55:45.138-05
248	gray	SV2110050321@@1	3	Audit_12/24/21	2021-12-24 15:55:53.852-05	2021-12-24 15:55:55.446-05
249	gray	SV2107070590@@1	3	Audit_12/24/21	2021-12-24 15:55:54.389-05	2021-12-24 15:55:56.337-05
250	gray	SV2107070593@@1	3	Audit_12/24/21	2021-12-24 15:55:57.681-05	2021-12-24 15:55:59.303-05
251	gray	SV2109070226@@1	3	Audit_12/24/21	2021-12-24 15:55:58.837-05	2021-12-24 15:56:00.305-05
253	F	SV2108100126@@1	3	Audit_12/24/21	2021-12-24 15:56:23.853-05	2021-12-24 15:56:25.546-05
252	F	sv2111280235@@1	0	Audit_12/24/21	2021-12-24 15:56:00.026-05	2021-12-24 15:56:10.891-05
254	F	SV2112220377@@1	3	Audit_12/24/21	2021-12-24 15:56:28.128-05	2021-12-24 15:56:29.158-05
255	F	SV2110080032@@1	0	Audit_12/24/21	2021-12-24 15:56:31.064-05	2021-12-24 15:56:31.064-05
256	F	SV2110080032@@1	1	Audit_12/24/21	2021-12-24 15:56:31.066-05	2021-12-24 15:56:31.066-05
257	F	SV2106150320@@1	3	Audit_12/24/21	2021-12-24 15:56:33.113-05	2021-12-24 15:56:34.936-05
258	F	SV2111190560@@1	3	Audit_12/24/21	2021-12-24 15:56:37.883-05	2021-12-24 15:56:39.136-05
259	X	SV2110120669@@1	\N	Audit_12/24/21	2021-12-24 16:24:33.032-05	2021-12-24 16:24:33.032-05
260	X	SV2110080649@@1	\N	Audit_12/24/21	2021-12-24 16:24:38.286-05	2021-12-24 16:24:38.286-05
261	A2	SV2112200731@@1	\N	Audit_12/24/21	2021-12-24 16:27:39.801-05	2021-12-24 16:27:39.801-05
262	A3	SV2110220150@@1	\N	Audit_12/24/21	2021-12-24 16:28:59.155-05	2021-12-24 16:28:59.155-05
263	E	SV2111030466@@1	\N	Audit_12/24/21	2021-12-24 16:34:27.255-05	2021-12-24 16:34:27.255-05
264	X	SV2110300756@@1	\N	Audit_12/24/21	2021-12-24 16:34:30.473-05	2021-12-24 16:34:30.473-05
265	X	SV2110280668@@1	\N	Audit_12/24/21	2021-12-24 16:34:30.76-05	2021-12-24 16:34:30.76-05
266	X	SV2110270159@@1	\N	Audit_12/24/21	2021-12-24 16:34:31.315-05	2021-12-24 16:34:31.315-05
267	X	SV2110170460@@1	\N	Audit_12/24/21	2021-12-24 16:34:31.587-05	2021-12-24 16:34:31.587-05
268	X	SV2110140283@@1	\N	Audit_12/24/21	2021-12-24 16:34:32.907-05	2021-12-24 16:34:32.907-05
269	X	SV2111030283@@1	\N	Audit_12/24/21	2021-12-24 16:35:32.258-05	2021-12-24 16:35:32.258-05
270	X	SV2111040811@@1	\N	Audit_12/24/21	2021-12-24 16:36:32.248-05	2021-12-24 16:36:32.248-05
271	X	SV2111040509@@1	\N	Audit_12/24/21	2021-12-24 16:42:09.252-05	2021-12-24 16:42:13.352-05
272	B3	SV2111050927@@1	\N	Audit_12/24/21	2021-12-24 16:43:57.705-05	2021-12-24 16:43:57.705-05
273	X	SV2111060216@@1	\N	Audit_12/24/21	2021-12-24 17:27:06.496-05	2021-12-24 17:27:06.496-05
\.


--
-- Data for Name: OrderMaterial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderMaterial" ("createdAt", "updatedAt", "MaterialId", "OrderId") FROM stdin;
\.


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orders" (id, status, "createdAt", "updatedAt", "requestId", "openDate", "isInHistory", "serialNumber", "statusId", problem, warehouse, "actionGroup", tag, "TechnicianId", "CustomerId", "orderType", product, type) FROM stdin;
SV2109090598@@1	Resolved	2021-12-20 14:31:16.382-05	2021-12-20 14:31:16.382-05	SV2109090598	2021-09-08 20:00:00-04	f	FVFXVK3BJK77	500	Symptom: doesnt turn on\r\nPassword: girlygirl2424\r\nApproved Services (Price): $40 plus tax\r\nDate of Last Backup: none and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 646-705-6280\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	\N	\N	\N	\N	\N
SV2108180172@@1	Resolved	2021-12-20 14:32:03.631-05	2021-12-20 14:32:03.631-05	SV2108180172	2021-08-17 20:00:00-04	f	sC02PR2GDFVH8	500	Symptom: No longer powers on / responsds to smc reset\r\nPassword:Sathyasai23*\r\nApproved Services (Price):40$ diag\r\nDate of Last Backup: Data not important*\r\nCurrent Security: No AV\r\nCondition: LCD gloss coming off\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:dpalanza	665-SD	QNTech	\N	\N	\N	\N	\N	\N
SV2112110770@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-20 16:29:04.3-05	2021-12-22 14:49:55.899-05	SV2112110770	2021-12-10 19:00:00-05	f	KQP567TC7T	201	APPLECARE COVERAGE $50\r\n7-14 DAYS SHIPOUT\r\nIPAD\r\n646-988-0027	665-SD	QNTech	\N	sinshiqaq	CUST2112112115	service_order	IPHONE/IPAD	\N
SV2112200104@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-20 14:50:44.793-05	2021-12-24 11:51:15.146-05	SV2112200104	2021-12-19 19:00:00-05	f	62010763376	205	hinges and bezels are damaged.\r\npass: ask if needed\r\ncell: 347-476-2572\r\nnever backed up. declined dbu\r\nwin. def. declined eset\r\n$40 for diagnostics\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	fpolorovira	CUST1901161666	service_order	Acer Laptop	\N
SV2106170452@@1	Invoiced	2021-12-24 12:15:10.103-05	2021-12-24 12:45:43.659-05	SV2106170452	2021-06-16 20:00:00-04	t	PF27AVCR	900	Center of screen - burn in mark\r\ncannot reinstall OS\r\n3-5 days	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112110776@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-20 16:29:10.934-05	2021-12-22 12:49:13.764-05	SV2112110776	2021-12-10 19:00:00-05	f	Q6QL6H9WGH	201	APPLECARE COVERAGE $50\r\n7-14 DAYS SHIPOUT\r\n646-988-0027	665-PR	QNTech	\N	erojas1	CUST2112112115	service_order	IPHONE/IPAD	\N
SV2109170549@@1	Resolved	2021-12-20 14:48:27.009-05	2021-12-20 14:48:37.215-05	SV2109170549	2021-09-16 20:00:00-04	f	K6N0CV12K324269	500	Symptom:no charge / no power\r\nPassword:ravenclaw\r\nApproved Services (Price):40$\r\nDate of Last Backup: school work / hasnt done a backup\r\nCurrent Security:windows def.\r\nCell (Text OK?):917 500 2225\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:dpalanza	665-SD	QNTech	145-1634153-1-1	tadams1	CUST1405310656	\N	\N	\N
SV2112220568@@1	Resolved	2021-12-24 10:25:01.258-05	2021-12-24 10:35:16.309-05	SV2112220568	2021-12-21 19:00:00-05	f	SF9FFP0VEQ1GF	500	Cracked screen / dents and scratches on back\r\n1 yr accidental protection\r\n917-607-1588\r\nKE: Asantisteban	665-SD	QNTech	145-2174455-2-1	sinshiqaq	CUST1406011080	service_order	**IPAD8_L20_32_GD	\N
SV2112050561@@1	Resolved	2021-12-20 16:30:14.087-05	2021-12-22 15:38:55.229-05	SV2112050561	2021-12-04 19:00:00-05	f	C1HJ003	500	Checked in by: Avi Maks. Customer here before under SV2111180150  \r\nDoesnt turn on.\r\nUnit checked in under Dell's warranty and also has our MicroCenter ADH plan.\r\nDate of last backup: Unknown. declined dbu\r\nAV: Win Defender. declined eset\r\nCell: 347 881 1647 \r\nKE:fpolorovira	665-PR	QNTech	115-1672984-1-1	erojas1	CUST2001034740	service_order	**I5400I31005G1/8/256/14H	\N
SV2112060606@@1	Resolved	2021-12-20 16:30:07.577-05	2021-12-22 15:39:00.716-05	SV2112060606	2021-12-05 19:00:00-05	f	SC02F223UQ05D	500	Accidental damage to majority of unit\r\nNoted data cannot be retrieved from unit.\r\nNoted plan will be used and any other occurences will not be covered\r\n7-14 days approx for repair	665-PR	QNTech	145-2058886-2-1	erojas1	CUST1812296288	service_order	MBP13_L20_M1/8/256_SG	\N
SV2109300458@@1	Resolved	2021-12-20 14:36:27.556-05	2021-12-21 16:21:26.161-05	SV2109300458	2021-09-29 20:00:00-04	f	G7N0CJIRR06A307	500	Symptom:left hindge crcked\r\nApproved Services (Price):40$ diag\r\nDate of Last Backup:data very important!!!**\r\nCurrent Security:norton\r\nCondition:crcked hindge (left)\r\nCell (Text OK?):347 403 4044\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:dpalanza	665-SD	QNTech	\N	tadams1	CUST2109302881	service_order	Asus laptop	\N
SV2112110781@@1	Stat 3 - Shipped to depot	2021-12-20 16:29:14.106-05	2021-12-22 14:53:44.13-05	SV2112110781	2021-12-10 19:00:00-05	f	GN4X9YJ7W9	207	APPLECARE COVERAGE $50\r\n7-14 DAYS SHIPOUT\r\n646-988-0027	665-PR	QNTech	\N	erojas1	CUST2112112115	service_order	IPHONE/IPAD	\N
SV2112080127@@1	Stat 3 - Shipped to depot	2021-12-20 16:29:56.14-05	2021-12-22 15:39:45.754-05	SV2112080127	2021-12-07 19:00:00-05	f	DCPGD079DHJN	207	Symptom: Wants data back up / recovery. Brought to Apple store for diag and said it was the hard drive.\r\nPassword: Goose!\r\nApproved Services (Price): No diag, just wants data\r\nDate of Last Back Up: Wants back up or recovery\r\nCurrent Security: Only wants data\r\nCondition: Worn\r\n718 544 8116\r\nDate and Time of Contact:\r\nKE: vmoses	665-PR	QNTech	\N	erojas1	\N	service_order	Apple-Generic	\N
SV2112190442@@1	Technician Assigned	2021-12-20 14:58:45.437-05	2021-12-24 10:22:11.946-05	SV2112190442	2021-12-18 19:00:00-05	f	6G0HG73	200	Broken screen, we could not find the part and reimbursing for the amount\r\nSVK145-2113420-4-1\r\n$722.96	665-SD	QNTech	145-2113420-1-1	vmoses	CUST1709160488	service_order	**I5400_238T1135G7/8/512H	\N
SV2112110784@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-20 16:29:20.675-05	2021-12-22 15:07:16.811-05	SV2112110784	2021-12-10 19:00:00-05	f	L70FV9P7NC	201	Shattered Screen\r\nAPPLECARE COVERAGE $50\r\n7-14 DAYS SHIPOUT\r\n646-988-0027	665-PR	QNTech	\N	erojas1	CUST2112112115	service_order	IPHONE/IPAD	\N
SV2112200443@@1	Technician Assigned	2021-12-20 15:03:39.407-05	2021-12-24 10:22:39.742-05	SV2112200443	2021-12-19 19:00:00-05	f	GX9ZT18ALKKT	200	case doesnt charge\r\ncell: 646-670-7415\r\napplecare+\r\n1-2 weeks\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple AirPods Not MC Purch	\N
SV2112030267@@1	Stat 3 - Shipped to depot	2021-12-20 16:30:24.773-05	2021-12-22 15:38:53.156-05	SV2112030267	2021-12-02 19:00:00-05	f	5CG0466R55	207	Symptom: Computer won't turn on. Son tried transfering pictures from apple phone plugged into laptop\r\nPassword: Ask for password\r\nApproved Services (Price): HP Manf. Warranty\r\nDate of Last Backup: never backed up / declined\r\nCurrent Security: n/a\r\nCondition: mild wear\r\nCell (Text OK?): 917-703-8224\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-PR	QNTech	\N	erojas1	\N	service_order	HP_laptop	\N
SV2112200482@@1	Stat 4 - Waiting on customer approval/response	2021-12-20 15:02:22.641-05	2021-12-24 10:22:38.431-05	SV2112200482	2021-12-19 19:00:00-05	f	C02JX3GPDNCR	208	Symptom: Running slow, wants it to be faster \r\nPassword: Rip4life\r\nApproved Services (Price):\r\nDate of Last Back Up: is backed up \r\nCurrent Security: does not have and not yet \r\nCondition: mild wear \r\nCall (Text OK?): 718 593 7072 \r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	\N	sinshiqaq	CUST2108192155	service_order	Apple Desktop	\N
SV2112200011@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.356-05	2021-12-24 17:32:24.257-05	SV2112200011	2021-12-19 19:00:00-05	f	Invalid-145-1801378-1-1	205	only charges at certain angles\r\npass: 2008\r\ncell: 347-531-8867\r\nnever backed up. unsure if dbu needed\r\nno av. declined eset\r\nhas 2 yr accidental plan\r\nke: fpolorovira	665-SD	QNTech	145-1801378-1-1	fpolorovira	CUST1407260777	service_order	**5584_8145U_8/256/15.6RT	"P" - Service Plan Contract Coverage
SV2112020172@@1	Technician Assigned	2021-12-20 16:30:25.239-05	2021-12-22 15:38:50.562-05	SV2112020172	2021-12-01 19:00:00-05	f	Invalid-CL0100312-145	200	Store Stock Needs Depot Service	665-PR	QNTech	CL0100312-145	erojas1	\N	service_order	**I5515_5700U/16/512/15HT	\N
SV2112170498@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-20 16:41:11.578-05	2021-12-23 16:12:15.217-05	SV2112170498	2021-12-16 19:00:00-05	f	W93KGWRW7X	205	cracked ipad\r\n$60 fee\r\n1-2 weeks\r\ncell: 929-261-7768\r\nke: fpolorovira	665-PR	QNTech	\N	erojas1	\N	service_order	IPHONE/IPAD	\N
SV2110310286@@1	Stat 3 - Shipped to depot	2021-12-20 16:31:22.645-05	2021-12-24 12:10:35.206-05	SV2110310286	2021-10-30 20:00:00-04	f	D6XV663	207	Symptom: The unit has BSOD, power, and display issues.\r\nPassword: recently reset, none.\r\nApproved Services (Price): Diag under Manufacturer's Warranty, also covered under 1YR Accidental.\r\nDate of Last Backup: Recently reset, DBU declined.\r\nCurrent Security: No. Mentioned ESET.\r\nCondition: Mild wear and tear.\r\nCell (Text OK?): 718.350.7610 (text okay)\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: mlim	665-PR	QNTech	145-2007891-1-1	erojas1	CUST2012200269	service_order	**I5502_1165G7/16/512/15T	\N
SV2112190284@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.253-05	2021-12-22 15:08:41.75-05	SV2112190284	2021-12-18 19:00:00-05	f	CND8175X94	205	Symptom: Works only when plugged in \r\nPassword: Shojew\r\nApproved Services (Price):\r\nDate of Last Backup: Would like a data back up prior to any repairs *\r\nCurrent Security: does not want it \r\nCondition: mild wear \r\nCell (Text OK?): 718 791 4947\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112170663@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.299-05	2021-12-22 15:08:47.394-05	SV2112170663	2021-12-16 19:00:00-05	f	Invalid-CL0098232-145	205	mobo needed	665-SD	QNTech	CL0098232-145	fpolorovira	\N	service_order	**R10_5800X/32/1/3070/PG	\N
SV2112190674@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.27-05	2021-12-24 14:22:30.137-05	SV2112190674	2021-12-18 19:00:00-05	f	G4370321530874	201	Issue:  running slow and rattling \r\nData Backup Option: Backup declined\r\nPassword: 8648\r\nmanufacturer warranty. also has 2 yr ext plan. 145-RE-2128996\r\nCell: 929 977 2626 (Text OK)\r\nProblem Description: So my pc is running really slow and has low performance and low cpu and gpu usage and pc making lot of noise rattling and crashing in games.	665-SD	QNTech	\N	fpolorovira	CUST21121911451	service_order	**G358_10700/32/1/57XT/P/	\N
SV2112230695@@1	Waiting for product	2021-12-24 10:25:25.247-05	2021-12-24 10:25:25.827-05	SV2112230695	2021-12-22 19:00:00-05	f	6315689301	100	$40 Prepaid Diagnostic 3 - 5 days\r\nCell: 631 568 9301 (Text OK)\r\nSymptom: Unit powers off after a few minutes of use. \r\nDoes not power off when idle, but minor use such as web browsing and opening word documents cause it to power off and restart.\r\nUnit running a little hot\r\nPassword: hayl\r\nlast backup: Data not needed\r\nAV: windefender\r\nKE: erojas1	\N	QNTech	\N	\N	CUST2004173728	service_order	Generic Desktop	\N
SV2112160568@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.222-05	2021-12-22 15:08:55.464-05	SV2112160568	2021-12-15 19:00:00-05	f	pf36v3aj	205	no boot. doesnt charge\r\npass: n/a\r\nunder man. warranty\r\nnever backed up. declined dbu\r\nno av. declined eset\r\ncell: 646-637-7434\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112180410@@1	Resolved	2021-12-21 09:22:10.203-05	2021-12-21 15:27:01.225-05	SV2112180410	2021-12-17 19:00:00-05	f	3473004404	500	Archie\r\n3473004404\r\nUnit checked in for diags, unit shuts and or black screen while playing warzone.\r\n$40, 3 to 5 days\r\nMD	665-SD	QNTech	\N	sinshiqaq	CUST2112175796	\N	\N	\N
SV2112130450@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.226-05	2021-12-21 15:27:24.371-05	SV2112130450	2021-12-12 19:00:00-05	f	FVFD2CT3MNHQ	208	cracked screen\r\npass: jp2012\r\ncell: 347-277-7906\r\napplecare +\r\nunsure of backup.\r\nno av . declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	CUST1408083355	\N	\N	\N
SV2108120196@@1	Resolved	2021-12-20 16:31:34.383-05	2021-12-22 15:24:31.59-05	SV2108120196	2021-08-11 20:00:00-04	f	4046510001	500	Symptom: No boot device detected - see attached postit note\r\nPassword: Combine1\r\nApproved Services (Price):40$ diag\r\nDate of Last Backup: Recently Backed up**\r\nCurrent Security: Norton\r\nCondition: Side panel open /\r\nCell (Text OK?): 347 255 0676\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:dpalanza	665-PR	QNTech	\N	erojas1	CUST2001295022	service_order	Dell_desktop	\N
SV2112130217@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.272-05	2021-12-21 15:27:23.741-05	SV2112130217	2021-12-12 19:00:00-05	f	GX5CVB1JLKKT	205	Left and right airpod crackles, covered under service program\r\n347-765-7657	665-SD	QNTech	\N	sinshiqaq	CUST1806013481	\N	\N	\N
SV2112150304@@1	Resolved	2021-12-21 09:22:10.274-05	2021-12-22 15:28:44.23-05	SV2112150304	2021-12-14 19:00:00-05	f	WQ047M05ATM	500	Symptom: Apple says here antenna is not working, cannot get on the internet\r\nPassword: applemel \r\nback up: only if necessary \r\nav: maybe after the repair is complete\r\nphone: 646 836 0909\r\nvmoses	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112170151@@1	Resolved	2021-12-21 09:22:10.255-05	2021-12-22 15:08:51.292-05	SV2112170151	2021-12-16 19:00:00-05	f	C02DG0ES049N	500	Issue: Cracked screen. Covered by AppleCare +.  3 - 5 days.\r\nFind my device removed.\r\nAuthorized for pickup: Koran Edwards\r\nApproved Price: $99.99 \r\nPhone: 646 591 4270 (Text OK)\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2110020507@@1	Resolved	2021-12-20 16:31:28.003-05	2021-12-22 15:38:38.539-05	SV2110020507	2021-10-01 20:00:00-04	f	NXA18AA0020420D4A73400	500	Eduard\r\n9179438360\r\nsv2109200415 reassessment, mobo check, check skype too\r\n3 to 5 days\r\nMD	665-PR	QNTech	145-2008387-1-1	erojas1	CUST20122011028	service_order	A515_1135G7/8/512/15.6H	\N
SV2112120504@@1	Stat 3 - Shipped to depot	2021-12-20 16:45:47.207-05	2021-12-22 12:36:52.677-05	SV2112120504	2021-12-11 19:00:00-05	f	G99GJ4P4Q07W	207	Does not pair to phone\r\nApple Warranty\r\nPhone: 917-480-8722\r\nCondition: Brand New still in box\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-PR	QNTech	\N	erojas1	\N	service_order	Generic Apple Watch	\N
SV2112170490@@1	Technician Assigned	2021-12-20 16:41:16.938-05	2021-12-22 15:31:01.704-05	SV2112170490	2021-12-16 19:00:00-05	f	QM39K529C4	200	cracked ipad\r\n$60 fee\r\n1-2 weeks\r\ncell: 929-261-7768\r\nke: fpolorovira	665-PR	QNTech	\N	erojas1	\N	service_order	IPHONE/IPAD	\N
SV2112170656@@1	Resolved	2021-12-21 09:22:10.465-05	2021-12-24 10:35:34.284-05	SV2112170656	2021-12-16 19:00:00-05	f	347-753-1446	500	no display. recent build. no side panels\r\ncell: 347-753-1446\r\nno data\r\nno av. declined eset\r\n$40 + tax\r\n2-4 days\r\nke: fpolorovira	665-SD	QNTech	\N	vmoses	CUST21112412888	service_order	Custom Build Desktop	\N
SV2112150131@@1	Stat 3 - Shipped to depot	2021-12-21 09:22:10.296-05	2021-12-21 15:27:19.245-05	SV2112150131	2021-12-14 19:00:00-05	f	PF26YHVB	207	3 - 5 day diagnostic under warranty.\r\nUnit does not work consistently. Powered off on its own once. \r\nBattery appears to be dying. Unit keeps saying that battery is missing. \r\nPhone: 646 462 1531 (text ok)\r\npassword: 932544\r\nDate of last backup: Unknown\r\nAV: Windefender\r\nKE: erojas1	665-SD	QNTech	\N	tadams1	\N	\N	\N	\N
SV2112190327@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.504-05	2021-12-24 10:21:42.045-05	SV2112190327	2021-12-18 19:00:00-05	f	NXGHHAA0047060EF4B7600	208	Symptom: hinge is broken on one side, have to hold the right side so the frame does not came off when opening it, some keys dont work "i" "ctrl" on the left side and the "2" key \r\nPassword: minecraft18\r\nApproved Services (Price): 40 \r\nDate of Last Backup: nothing of importance \r\nCurrent Security: not right now \r\nCondition: mild wear \r\nCell (Text OK?): 646 552 1095 \r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	fpolorovira	CUST1502073460	service_order	Acer Laptop	\N
SV2112190092@@1	Technician Assigned	2021-12-21 09:22:10.489-05	2021-12-21 15:26:56.731-05	SV2112190092	2021-12-18 19:00:00-05	f	347-776-7864	200	wants to do rebuild. \r\n$300\r\npass: X23\r\ncell: 347-776-7864\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n1-2 days\r\nke: fpolorovira	665-SD	QNTech	\N	asantisteban	CUST2112130095	\N	\N	\N
SV2112200271@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.517-05	2021-12-24 11:51:12.919-05	SV2112200271	2021-12-19 19:00:00-05	f	Invalid-CL0101105-145	205	needs charger. order from ebay\r\nsn: 1dxd2jg3	665-SD	QNTech	CL0101105-145	fpolorovira	\N	service_order	I5510_11390H/16/512/15.6T	\N
SV2112230784@@1	Received in Shop - Unassigned	2021-12-24 10:25:25.265-05	2021-12-24 10:25:28.541-05	SV2112230784	2021-12-22 19:00:00-05	f	Invalid-145-1466142-3-1	101	symptom: cracked screen \r\npassword: jasmine\r\nback up: nothing of much importance\r\nav: declined\r\n718 340 8186 or 201 893 9004\r\nvmoses \r\nserial C02V1DJ0J1WK	665-SD	QNTech	145-1466142-3-1	\N	CUST1411263886	service_order	**MBA_13"1.6I5/8/256_SG	\N
SV2112200350@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.406-05	2021-12-24 10:22:38.311-05	SV2112200350	2021-12-19 19:00:00-05	f	c02jd55adty3	201	Symptom: Cannot log in, system shows apple logo and freezes up \r\nPassword: Atl@1004\r\nApproved Services (Price): 40 \r\nDate of Last Back Up: data backed up \r\nCurrent Security: does not want it and does not have av \r\nCondition: mild wear \r\nCall (Text OK?): 919 923 3554\r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112170497@@1	Stat 3 - Shipped to depot	2021-12-21 09:22:10.377-05	2021-12-24 10:23:51.275-05	SV2112170497	2021-12-16 19:00:00-05	f	TXVV74XDQX	207	cracked ipad\r\n$60 fee\r\n1-2 weeks\r\ncell: 929-261-7768\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	IPHONE/IPAD	\N
SV2112190118@@1	Technician Assigned	2021-12-21 09:22:10.342-05	2021-12-22 15:08:41.852-05	SV2112190118	2021-12-18 19:00:00-05	f	G700111740929	200	customer wants to update to windows 11. cpu not compatible so he wants to switch out for a new one. also bluetooth is not working.\r\npass: 42453100\r\ncell: 516-425-8394\r\nrecent backup. declined dbu\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	115-968421-1-1	sinshiqaq	CUST1801011960	service_order	**G700_R7/16/480/1070/P/G	\N
SV2112180236@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.421-05	2021-12-24 10:24:57.278-05	SV2112180236	2021-12-17 19:00:00-05	f	fvfd9becp3xy	208	Symptom: Liquid damage, does not turn on or anything. Has Applecare+\r\nPassword: kyrieirving02\r\nback up: nothing important on the drive \r\nav: Malwarebytes\r\nphone: 347 420 3008\r\nvmoses	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112120455@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.437-05	2021-12-21 09:22:11.182-05	SV2112120455	2021-12-11 19:00:00-05	f	C02QH114FY14	208	Symptom: cracked screen, turns by itself \r\nPassword: Apple \r\nApproved Services (Price): 40 for diag\r\nDate of Last Backup:\r\nCurrent Security:\r\nCondition:\r\nCell (Text OK?):\r\nDate and Time of Contact: at least 72 business hours for diagnostic result	665-SD	QNTech	\N	sinshiqaq	\N	\N	\N	\N
SV2112230569@@1	Technician Assigned	2021-12-24 10:25:26.524-05	2021-12-24 12:08:47.181-05	SV2112230569	2021-12-22 19:00:00-05	f	SGG7FV50PQ1GH	200	Ipad touchscreen not working\r\npass code 1532\r\n347 557 4166	665-SD	QNTech	145-2203869-1-1	sinshiqaq	CUST1409032721	service_order	**IPAD8_L20_128_SV	\N
SV2112190101@@1	Resolved	2021-12-21 09:22:10.327-05	2021-12-24 10:22:14.01-05	SV2112190101	2021-12-18 19:00:00-05	f	347-249-6642	500	start up loop. s/n washed off. warranty status unknown\r\npass: ask if needed\r\ncell: 347-249-6642\r\n$40  for diagnostics\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST1610011291	service_order	Dell Laptop	\N
SV2112120171@@1	Technician Assigned	2021-12-21 09:22:10.391-05	2021-12-21 09:22:11.743-05	SV2112120171	2021-12-11 19:00:00-05	f	GX4ZLAHLLKKT	200	Apple Airpods\r\nRight earbud is not working, and they are not charging\r\nHas APPLECARE+\r\nPhone: 929 343 4457\r\n vmoses	665-SD	QNTech	\N	sinshiqaq	CUST1909090209	\N	\N	\N
SV2112120726@@1	Resolved	2021-12-21 09:22:10.531-05	2021-12-21 09:22:12.05-05	SV2112120726	2021-12-11 19:00:00-05	f	G228082052202	500	Symptom: WiFi issues, intermittent connectivity (also has a javascript alert)\r\nPassword: orel\r\nAV: Has eset \r\nBack up: nothing of importance\r\nPhone: 516 477 6969\r\nVMOSES	665-SD	QNTech	145-1907160-1-1	fpolorovira	CUST1212205355	\N	\N	\N
SV2112180217@@1	Technician Assigned	2021-12-21 09:22:10.45-05	2021-12-22 15:08:44.101-05	SV2112180217	2021-12-17 19:00:00-05	f	9176628149	200	Symptom: PC running very slow, has 3 yr accidental \r\nPassword: 6287\r\nBack up: nothing important \r\nAV: Eset\r\nphone: 9176628149	665-SD	QNTech	\N	asantisteban	CUST2012264237	service_order	Custom Build Desktop	\N
SV2112200495@@1	Technician Assigned	2021-12-21 09:22:10.362-05	2021-12-24 11:51:05.626-05	SV2112200495	2021-12-19 19:00:00-05	f	9178472692	200	Symptom: PC freezes, mainly after Windows updates\r\nPassword: no password \r\nApproved Services (Price): 40\r\nDate of Last Back Up: backed up, but a couple of drives are disconnected on purpose to avoid losing data on them\r\nCurrent Security: not right now \r\nCondition: worn \r\nCall (Text OK?): 917 847 2692\r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	\N	vmoses	CUST1804060761	service_order	Custom Build Desktop	\N
SV2112200607@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.534-05	2021-12-24 12:10:21.011-05	SV2112200607	2021-12-19 19:00:00-05	f	Invalid-CL0100951-145	205	front cover damaged	665-SD	QNTech	CL0100951-145	fpolorovira	\N	service_order	**I3880_I5-10400/8/512/H	\N
SV2112190317@@1	Resolved	2021-12-21 09:22:10.34-05	2021-12-22 15:08:41.738-05	SV2112190317	2021-12-18 19:00:00-05	f	GA15DK062130211	500	Symptom: repairing d drive error and no display on the tv but will connect to a pc monitor  \r\nPassword: 4771 \r\nApproved Services (Price):\r\nDate of Last Backup: nothing of importance \r\nCurrent Security: **Wants eset internet security $99 for 3 years\r\nCondition: mild wear \r\nCell (Text OK?): 646 377 3139\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	145-2201577-1-1	vmoses	CUST2009095842	service_order	A501_5600X/32/1+1/3060/P	\N
SV2112150082@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.491-05	2021-12-22 15:28:21.632-05	SV2112150082	2021-12-14 19:00:00-05	f	9WBK6L2	208	Symptom: Has a virus, hard drive failing. Was dropped.\r\nPassword: 3131\r\nBack up: Has important data but does not want a back up\r\nAV: McAfee\r\nPhone: 347 858 6854\r\nvmoses	665-SD	QNTech	\N	tadams1	CUST1305300186	service_order	Dell Laptop	\N
SV2112230110@@1	Waiting for product	2021-12-24 10:25:27.612-05	2021-12-24 10:25:31.852-05	SV2112230110	2021-12-22 19:00:00-05	f	3474377177	100	$40 Prepaid diagnostic 3 -5 days\r\nCell: 347 437 7177 (Text OK)\r\nTurns on but no display at all. Steady VGA white light.\r\nCustomer tried reseating RAM and video card to no avail.\r\nDate of last backup: Unknown\r\nAV: Windefender\r\nKE: erojas1	\N	QNTech	\N	\N	\N	service_order	Generic Desktop	\N
SV2112170666@@1	Resolved	2021-12-21 09:22:10.389-05	2021-12-21 15:27:09.48-05	SV2112170666	2021-12-16 19:00:00-05	f	347-742-7071	500	no display. customer thinks it may have been a power surge\r\npass: 3600\r\ncell: 347-742-7071\r\nnever backed up. may want dbu\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	vmoses	\N	\N	\N	\N
SV2112190100@@1	Resolved	2021-12-21 09:22:10.298-05	2021-12-24 10:22:29.425-05	SV2112190100	2021-12-18 19:00:00-05	f	C02CVF5XMNHP	500	Symptom: Water spilled, does not charge\r\nPassword: 073020\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: never, declined\r\nCurrent Security: none\r\nCondition: mild wear\r\nCell (Text OK?): 929-372-8572\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112200171@@1	Resolved	2021-12-21 09:22:10.326-05	2021-12-22 15:40:31.619-05	SV2112200171	2021-12-19 19:00:00-05	f	C07MD1YTDWYL	500	$40 Prepaid Diagnostic. 3 - 5 days.\r\nMac Mini\r\nUnit is running very slowly.\r\n347 742 4885\r\nCustomer would like SSD installation. 2 TB Drive (Crucial Preferred please avoid Samsung)\r\nCurrently booting off an external drive. \r\nData is important. Customer would like original drive back.	665-SD	QNTech	\N	sinshiqaq	CUST2112095326	service_order	Generic Apple Laptop	\N
SV2112170063@@1	Resolved	2021-12-21 09:22:10.505-05	2021-12-21 09:22:11.323-05	SV2112170063	2021-12-16 19:00:00-05	f	347-596-9597	500	no power\r\npass: ask if needed\r\ncell:347-596-9597\r\nnever backed up. unsure if dbu is needed\r\nno eset. declined eset\r\n$40 + tax\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	asantisteban	\N	\N	\N	\N
SV2112110620@@1	Resolved	2021-12-21 09:22:10.471-05	2021-12-22 15:39:46.662-05	SV2112110620	2021-12-10 19:00:00-05	f	DX5DT57JKXKN	500	Symptom: Cracked screen / back\r\nPassword: 030710\r\nPhone: 3474001747\r\nke: vmoses	665-PR	QNTech	\N	erojas1	\N	service_order	IPHONE/IPAD	\N
SV2112170162@@1	Resolved	2021-12-21 09:22:10.521-05	2021-12-21 09:22:12.025-05	SV2112170162	2021-12-16 19:00:00-05	f	INBOX14	500	customer wants to do barebones build. wants bios update as well.\r\n$250\r\n1-2 days\r\ncell: 646-296-6309\r\nke: fpolorovira	665-SD	QNTech	145-2278327-2-1	asantisteban	CUST21111011550	\N	\N	\N
SV2112170568@@1	Resolved	2021-12-21 09:22:10.374-05	2021-12-24 10:35:43.229-05	SV2112170568	2021-12-16 19:00:00-05	f	6G0HG73	500	Under 3 year accidental protection plan.\r\nCell: 929 231 3390 (text OK)\r\nBroken screen.\r\n24 Hr diagnostic.\r\nKE: erojas1	665-SD	QNTech	145-2113420-1-1	mdigier	CUST1709160488	service_order	**I5400_238T1135G7/8/512H	\N
SV2112170583@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.359-05	2021-12-24 10:23:45.446-05	SV2112170583	2021-12-16 19:00:00-05	f	c02d90tw07f1	205	Symptom: physical damage to screen and case\r\nPassword: davisfamily\r\nApproved Services (Price): AppleCare + (estimate: $300)\r\nDate of Last Backup: Last month cloud storage\r\nCurrent Security: unsure / ask after repair\r\nCondition: heavily damaged\r\nCell (Text OK?): 917-833-2492\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	CUST1405283174	service_order	Apple Desktop	\N
SV2112200147@@1	Resolved	2021-12-21 09:22:10.219-05	2021-12-24 11:51:16.738-05	SV2112200147	2021-12-19 19:00:00-05	f	C02SYRAFGTFJ	500	$40 Prepaid Diagnostic. 3 - 5 days.\r\nScreen does not work. Completely dark. \r\n'N' key fires off twice when pressed.\r\nFMV disabled.\r\nDate of last backup: unknown\r\nCell: 917 292 9923\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112200371@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.434-05	2021-12-24 10:22:44.957-05	SV2112200371	2021-12-19 19:00:00-05	f	3478091236	201	$40 Prepaid Diagnostic 3 - 5 days.\r\nComputer does not boot. VGA white light on motherboard.\r\nChecked in by: Solayman Mansouri\r\n347 809 1236 (Text OK)\r\nDate of last backup: Unknown\r\nAV: Windefender\r\nPW: 1877\r\nKE: erojas1	665-SD	QNTech	\N	fpolorovira	CUST17123010242	service_order	Generic Desktop	\N
RP2009080210@@1	Invoiced	2021-12-24 12:44:28.546-05	2021-12-24 12:44:28.812-05	RP2009080210	2020-09-07 20:00:00-04	t	PF-2BNKY5	900	unit is checked in good condition\r\ncustomer tried to replace the HDD, now seems like there's issue through bluetooth, shuts off radomly \r\nmotherboard possibly the issue\r\nunder lenovo warranty\r\nPhone: 646 637 7434\r\n1 to 2 weeks	665-SD	QNTech	\N	tadams1	\N	repair_order	Lenovo Laptop	\N
SV2112190110@@1	Resolved	2021-12-21 09:22:10.403-05	2021-12-21 09:22:11.763-05	SV2112190110	2021-12-18 19:00:00-05	f	CND8175X94	500	Ram Installation $19.99\r\nASantisteban\r\n718-440-5410	665-SD	QNTech	\N	asantisteban	CUST2112190985	\N	\N	\N
SV2112110488@@1	Completed	2021-12-21 09:22:10.419-05	2021-12-21 09:22:11.775-05	SV2112110488	2021-12-10 19:00:00-05	f	Invalid-145-1821466-1-1	700	Airpods 932897 $119.99\r\n2 yr replacement\r\nAsantisteban	665-SD	QNTech	145-1821466-1-1	asantisteban	CUST14042419489	\N	\N	\N
SV2110080649@@1	Resolved	2021-12-24 15:59:15.867-05	2021-12-24 15:59:16.544-05	SV2110080649	2021-10-07 20:00:00-04	f	NHQ96AA003021072143400	500	Symptom: GPU FAN SPEED SLOWER THAN USUAL / TRACK PAD DOESNT WORK\r\nDate of Last Backup:ALL BACKED UP\r\nCurrent Security: WINDOWS DEF\r\nCell (Text OK?):212 433 0249\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:DPALANZA	665-SD	QNTech	145-2041733-1-1	pflaherty	CUST1809134147	service_order	**N5_9750H16/256/206015.6	\N
SV2112180385@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.336-05	2021-12-24 10:24:54.4-05	SV2112180385	2021-12-17 19:00:00-05	f	NXHQ7AA001032013136600	205	Symptom: does not charge, possible dead battery\r\nPassword: loldoll123 or Becs2020\r\nBack up: nothing important \r\nAV: not right now \r\nPhone: 347 432 0146\r\n vmoses	665-SD	QNTech	145-2013024-1-1	tadams1	CUST1802274321	service_order	**SPIN3I51035G4/8/512/14T	\N
SV2112120311@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.301-05	2021-12-21 09:22:11.561-05	SV2112120311	2021-12-11 19:00:00-05	f	9294201305	208	was here before under sv2112030674. has to press power button a few times before it turns on.\r\npass: nikozal2008!\r\ncell:929-420-1305\r\nnever backed up. declined dbu\r\nno av . declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	vmoses	CUST2112037460	\N	\N	\N
SV2112200202@@1	Technician Assigned	2021-12-21 09:22:10.317-05	2021-12-22 15:08:27.469-05	SV2112200202	2021-12-19 19:00:00-05	f	MCB2020919	200	250 plus tax for labor, noted due to extra drives and work it is slightly more\r\nnew build \r\n5162426864	665-SD	QNTech	\N	asantisteban	CUST2112047133	service_order	Custom Build Desktop	\N
SV2112150294@@1	Resolved	2021-12-21 09:22:10.387-05	2021-12-22 15:28:47.819-05	SV2112150294	2021-12-14 19:00:00-05	f	C02GH2K4DV7M	500	computer turns off randomly. now it doesnt turn on at all.\r\npass: guest account\r\nnever backed up. wants backup if needed. \r\nno av. declined eset\r\n$40 + tax\r\n2-4 days\r\ncell: 917-815-4235\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	CUST1904033905	service_order	Generic Apple Laptop	\N
SV2112190412@@1	Technician Assigned	2021-12-21 09:22:10.257-05	2021-12-22 15:08:36.109-05	SV2112190412	2021-12-18 19:00:00-05	f	014917329705	200	Symptom: Tried to install Ryzen 5000 series cpu, did bios update beforehand, would like diagnostics to see if all parts still ok\r\nPassword: ask for password if needed\r\nApproved Services (Price): Gen Diag $39.99\r\nDate of Last Backup: over the weekend\r\nCurrent Security: windows antivirus\r\nCondition: mild wear\r\nCell (Text OK?): 718-316-3117\r\nDate and Time of Contact: 2-3 days\r\nKE: Asantisteban	665-SD	QNTech	\N	vmoses	CUST1405094063	service_order	Custom Build Desktop	\N
SV2112200731@@1	Resolved	2021-12-21 09:22:10.542-05	2021-12-24 10:22:45.945-05	SV2112200731	2021-12-19 19:00:00-05	f	631-839-3147	500	wants to perform instore data recovery\r\n$50 if unsuccessful. $300 if successful\r\ncell: 631-839-3147\r\nke: fpolorovira	665-SD	QNTech	\N	fpolorovira	CUST071219971444	service_order	Custom Build Desktop	\N
SV2112190295@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.501-05	2021-12-24 10:22:25.03-05	SV2112190295	2021-12-18 19:00:00-05	f	h4hdteuaq1y3	208	no display on watch. still vibrates\r\nlimited warranty\r\ncell: 718-840-9329\r\n1-2 weeks\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Watch	\N
SV2112210016@@1	Technician Assigned	2021-12-21 09:22:10.373-05	2021-12-24 10:21:59.705-05	SV2112210016	2021-12-20 19:00:00-05	f	cnd1313l2l	200	Symptom: powers on but no display, dropped from small table (dent by headphone jack), tried to repair themselves (opened back)\r\nPassword: \r\nApproved Services (Price): Manf. Warranty\r\nDate of Last Backup: nothing on it / declined\r\nCurrent Security: none / declined\r\nCondition: mild wear, dent on corner\r\nCell (Text OK?): 347-738-7882\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	asantisteban	CUST2011091187	service_order	HP_laptop	\N
SV2112200241@@1	Resolved	2021-12-21 09:22:10.275-05	2021-12-22 15:08:33.816-05	SV2112200241	2021-12-19 19:00:00-05	f	718-427-6455	500	no display\r\npass: 1759\r\nnever backed up. declined dbu\r\nunsure of av. declined eset\r\ncell:718-427-6455\r\n$40 for diagnostics\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	vmoses	\N	service_order	Custom Build Desktop	\N
SV2112170770@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.514-05	2021-12-24 10:23:47.701-05	SV2112170770	2021-12-16 19:00:00-05	f	S5109131227	205	SN: C02WT43DJ1G5\r\nName: Mitch Marcus\r\nPhone: 5109131227\r\nIssue: Possible RAM upgrade and MacOS upgrade.	665-SD	QNTech	145-2306202-8-1	sinshiqaq	CUST2112150389	service_order	Diagnostic Charge	\N
SV2112160570@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.433-05	2021-12-22 15:08:56.387-05	SV2112160570	2021-12-15 19:00:00-05	f	PF20ART1	205	no video\r\npass: n/a\r\nunder man. warranty\r\nnever backed up. declined dbu\r\nno av. declined eset\r\ncell: 646-637-7434\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112130876@@1	Resolved	2021-12-21 09:22:10.447-05	2021-12-21 15:27:23.346-05	SV2112130876	2021-12-12 19:00:00-05	f	CND9363PWN	500	Symptom: Did an update and backed out of it, now HP logo comes up and does not boot fully\r\nPassword: 24kdiamond\r\nBackup: Nothing of importance \r\nAV: McAfee\r\nphone: 347 848 2978\r\nvmoses	665-SD	QNTech	\N	fpolorovira	CUST1611258356	\N	\N	\N
SV2112220755@@1	Technician Assigned	2021-12-24 10:25:32.995-05	2021-12-24 10:25:37.499-05	SV2112220755	2021-12-21 19:00:00-05	f	F018981C0E87	200	was here before for SV2112160780. screen glitches and then turns off afterwards\r\npass: 0\r\nicloud backup. declined dbu\r\nno av. declined eset\r\nhas 3 year adh plan\r\ncell: 718-650-9806\r\nke: fpolorovira	665-SD	QNTech	145-1461672-1-1	sinshiqaq	CUST1607312331	service_order	**MBP13.3_SGR/2.3/8G/128G	\N
SV2112160569@@1	Stat 1 - Tech bench; active repair in progess	2021-12-21 09:22:10.401-05	2021-12-22 15:08:55.857-05	SV2112160569	2021-12-15 19:00:00-05	f	pf2lcwed	203	was giving beeping codes before. wasnt booting. now it boots however.\r\npass: n/a\r\nunder man. warranty\r\nnever backed up. declined dbu\r\nno av. declined eset\r\ncell: 646-637-7434\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112160805@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.462-05	2021-12-22 15:08:53.385-05	SV2112160805	2021-12-15 19:00:00-05	f	SPF260QJG	205	bezel area and hinge area is open.\r\npass: 1606\r\ncell: 646-248-2614\r\nbacked up recently. declined dbu\r\nhas av. declined eset\r\nke: fpolorovira	665-SD	QNTech	145-1835048-1-1	tadams1	CUST1701311979	service_order	**IP5I51035G1/8/512/15.6H	\N
SV2112200462@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.528-05	2021-12-21 15:26:42.101-05	SV2112200462	2021-12-19 19:00:00-05	f	Invalid-145-1365831-1-1	201	cant boot to windows\r\npass: ask if needed\r\ncell: 718-909-4035\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n$40 for diagnostics\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	145-1365831-1-1	fpolorovira	CUST1408242595	\N	\N	\N
SV2112230626@@1	Technician Assigned	2021-12-24 10:25:27.013-05	2021-12-24 14:23:50.953-05	SV2112230626	2021-12-22 19:00:00-05	f	2011933071803843	200	Plays battlefield, 15-20 mins the game crashes. Crashes during benchmark tests.\r\nSVK171-8571833-8-1	665-SD	QNTech	171-8571833-2-1	vmoses	CUST20100725851	service_order	**RTX2070_SUPER_BLK_DUAL	\N
SV2112220714@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-24 10:25:34.161-05	2021-12-24 10:35:21.239-05	SV2112220714	2021-12-21 19:00:00-05	f	c17lgb8wf5v7	201	cracked screen\r\npass:12aiden. for guest account\r\ncell:718-413-8653\r\nnever backed up. wants dbu if needed\r\nno av. declined eset\r\n$40 for diagnostics\r\n3-5 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112170369@@1	Resolved	2021-12-21 09:22:10.302-05	2021-12-24 10:23:43.031-05	SV2112170369	2021-12-16 19:00:00-05	f	FVFZ7G6WLYWL	500	no power\r\npass: ask if needed\r\nicloud backup. wants dbu if needed\r\nno av. declined eset\r\ncell: 201-238-9714\r\n$40 + tax\r\n2-4 days for diagnostics\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112180671@@1	Completed	2021-12-21 09:22:10.498-05	2021-12-24 10:35:30.129-05	SV2112180671	2021-12-17 19:00:00-05	f	Invalid-CL0097957-145	700	fix	665-SD	QNTech	CL0097957-145	mdigier	\N	service_order	**R10_R95900X32/1/3080/PG	\N
SV2112190167@@1	Technician Assigned	2021-12-21 09:22:10.511-05	2021-12-21 15:26:58.776-05	SV2112190167	2021-12-18 19:00:00-05	f	3472563968	200	was here before for SV2112150144. customer connected bluray drive to motherboard and computer wouldnt boot up afterwards. cant boot into windows or bios. customer also brought power sata cables just in case. \r\ncell: 347-256-3968\r\nno data\r\nno av. declined eset\r\n2-4 days\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST1403312259	\N	\N	\N
SV2112190477@@1	Resolved	2021-12-21 09:22:10.4-05	2021-12-24 10:21:54.647-05	SV2112190477	2021-12-18 19:00:00-05	f	aa29-521b-031b-05a2	500	Does not post. Went to best buy and were told GPU may be dead\r\nGen Diag $39.99 + Tax\r\nPassword: BigGory1234\r\n917-601-4575\r\nbackup: a while ago / declined\r\nAV: does have\r\nASantisteban	665-SD	QNTech	\N	vmoses	\N	service_order	Custom Build Desktop	\N
SV2112150694@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.425-05	2021-12-22 15:28:32.12-05	SV2112150694	2021-12-14 19:00:00-05	f	DLBF9H2	208	blue screen errors. customer wants to see if we can delete third party apps on computer. leave only microsoft apps\r\npass: 258477\r\nusb back up done recently. declined dbu\r\nno av. declined eset\r\ncell: 914-230-9844\r\n$40 + tax\r\n2-4 days\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	CUST1806285436	service_order	Dell_desktop	\N
SV2112150470@@1	Resolved	2021-12-21 09:22:10.386-05	2021-12-21 15:27:20.348-05	SV2112150470	2021-12-14 19:00:00-05	f	mj02k0n	500	no video. customer also left additional gpu to test\r\nno hard drives in computer\r\nno av. declined eset\r\ncell: 917-751-8690\r\nke: fpolorovira\r\n$40 for diagnostics\r\n2-4 days for results	665-SD	QNTech	\N	tadams1	CUST1301120133	\N	\N	\N
SV2112190536@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.329-05	2021-12-22 15:08:42.831-05	SV2112190536	2021-12-18 19:00:00-05	f	Invalid-CL0097760-145	205	needs mobo and cpu\r\nsn: 72CQDF3\r\nunder man. warranty	665-SD	QNTech	CL0097760-145	fpolorovira	\N	service_order	**R10_5600X/16/1/3060TIPG	\N
SV2112160550@@1	Resolved	2021-12-21 09:22:10.524-05	2021-12-22 15:08:55.055-05	SV2112160550	2021-12-15 19:00:00-05	f	C02DM187ML85	500	$40 prepaid diagnostic. 3 - 5 days.\r\nCracked screen.\r\nDate of last backup: Unknown.\r\nCell: 347 234 3241\r\nFind my device has been disabled.\r\n\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112200830@@1	Technician Assigned	2021-12-21 09:22:10.538-05	2021-12-24 11:51:09.194-05	SV2112200830	2021-12-19 19:00:00-05	f	G223111853427	200	Symptom: Crypto mined via cpu and played games and PC crashed. Will not turn on  \r\nPassword: 1229\r\nApproved Services (Price): warranty\r\nDate of Last Back Up: nothing important \r\nCurrent Security: has av \r\nCondition: worn \r\nCall (Text OK?):  3478709084 \r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	145-1456030-1-1	vmoses	CUST1812238046	service_order	**G223I584/16O250/11060HG	\N
SV2102180187@@1	Invoiced	2021-12-24 12:44:30.957-05	2021-12-24 12:44:30.967-05	SV2102180187	2021-02-17 19:00:00-05	t	PF-ZDBK90	900	bad ssd\r\n3-4 days for diag	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	\N
SV2112130328@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.483-05	2021-12-21 09:22:11.94-05	SV2112130328	2021-12-12 19:00:00-05	f	L9NRCX00M014363	205	Customer name: Aridio\r\nblue screens. wifi is very slow\r\npass: ask if needed\r\ncell: 347-337-7205\r\nnever backed up. wants one if needed. \r\nno av. wants one if needed\r\nunder man. warranty\r\n2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	105-3046448-1-1	tadams1	CUST2002159547	\N	\N	\N
SV2112170708@@1	Resolved	2021-12-21 09:22:10.443-05	2021-12-21 09:22:11.851-05	SV2112170708	2021-12-16 19:00:00-05	f	56F3P42	500	Symptom: Overheating + upgrade possibilities\r\nPassword: N/A\r\nApproved Services (Price): Gen Diag $39.99 + Tax\r\nDate of Last Backup: Backup requested on own drive ($99.99 + Tax)\r\nCurrent Security: windows\r\nCondition: mild wear\r\nCell (Text OK?): 347-484-7537 Gerry\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	asantisteban	CUST1010211530	\N	\N	\N
SV2112170224@@1	Resolved	2021-12-21 09:22:10.36-05	2021-12-21 09:22:11.671-05	SV2112170224	2021-12-16 19:00:00-05	f	NXHSHAA0040280A77B7600	500	computer charges sometimes. has to be held at a certain angle to charge.\r\npass: 3322\r\ncell: 917-453-1057\r\n$40 + tax\r\nnever backed up. wants dbu if needed\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	145-1932125-1-1	tadams1	CUST1409135421	\N	\N	\N
SV2112200586@@1	Stat 3 - Shipped to depot	2021-12-21 09:22:10.341-05	2021-12-24 10:34:43.923-05	SV2112200586	2021-12-19 19:00:00-05	f	FVFD3A1PMNHX	207	water damage\r\ncell: 347-447-2594\r\napplecare+\r\n$299 deductible\r\nicloud backup. declined dbu\r\nno av. declined eset\r\n1-2 weeks\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112160521@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.413-05	2021-12-21 15:27:11.619-05	SV2112160521	2021-12-15 19:00:00-05	f	.917-345-0755	201	no boot\r\npass: hunterd1010\r\ncell: 917-345-0755\r\nrecent backup. declined dbu\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	asantisteban	\N	\N	\N	\N
SV2110300756@@1	Resolved	2021-12-24 15:59:18.916-05	2021-12-24 16:22:51.179-05	SV2110300756	2021-10-29 20:00:00-04	f	009131710566	500	2129608839\r\nissue: trackpad issues, left click gets stuck\r\nchecking in under warranty, customer also has carry-in extension plan\r\ndata needed, av - n/a	665-SD	QNTech	145-2083360-1-1	pflaherty	CUST1511303607	service_order	SLTGOI5/8/128/12.4T/BLU	"W" - Manufacturer's Warranty Repair
SV2110220150@@1	Resolved	2021-12-24 15:59:17.932-05	2021-12-24 16:23:12.882-05	SV2110220150	2021-10-21 20:00:00-04	f	347-869-4403	500	Symptom: customer wants to do gilware diagnostics for usb\r\nApproved Services (Price): $50\r\nCell (Text OK?): 347-869-4403\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	fpolorovira	\N	service_order	Custom Build Desktop	"DR" Data Recovery
SV2112200939@@1	Technician Assigned	2021-12-21 09:22:10.405-05	2021-12-24 11:51:07.445-05	SV2112200939	2021-12-19 19:00:00-05	f	SMXX25108JH	200	Symptom: no display \r\nPassword: no password \r\nApproved Services (Price):\r\nDate of Last Backup: Will do the back up \r\nCurrent Security: does not have and does not want it \r\nCondition: mild wear \r\nCell (Text OK?): 917 682 7898 \r\nDate and Time of Contact: 4-6 days\r\nKE: vmoses	665-SD	QNTech	\N	vmoses	CUST1601202214	service_order	Generic HP desktop	\N
SV2112200822@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.363-05	2021-12-24 10:22:45.964-05	SV2112200822	2021-12-19 19:00:00-05	f	C02PQ5A4FVH7	208	$40 Prepaid Diagnostic 3 - 5 days.\r\nLines on screen. \r\npassword: ManofGod\r\nCustomer would also like a fresh start with his machine. Interested in OS reinstallation.\r\nData not needed.\r\nFMV is off.\r\nAV: Not sure\r\nCell: 646 283 1072\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	CUST1604190413	service_order	Generic Apple Laptop	\N
SV2112180288@@1	Technician Assigned	2021-12-21 09:22:10.348-05	2021-12-21 09:22:10.955-05	SV2112180288	2021-12-17 19:00:00-05	f	Invalid-CL0100509-145	200	Unit defective, damaged hinging and unit placed incorrectly in box.\r\nRecommend for RTV or repair.	665-SD	QNTech	CL0100509-145	gmanolas1	\N	\N	\N	\N
SV2112150747@@1	Resolved	2021-12-21 09:22:10.42-05	2021-12-21 10:49:09.399-05	SV2112150747	2021-12-14 19:00:00-05	f	1S7033A2UMJTDHMV	500	windows icons keep reappearing. cursor stuck in the loading icon.\r\npass: 1900\r\ncell: 718-578-8004\r\nhas 2yr carry in plan\r\nnever backed up. declined dbu\r\nhas eset\r\nke: fpolorovira	665-SD	QNTech	145-1669677-1-1	tadams1	CUST1707311454	\N	\N	\N
SV2112140214@@1	Resolved	2021-12-21 09:22:10.435-05	2021-12-21 15:27:21.101-05	SV2112140214	2021-12-13 19:00:00-05	f	W8032389ATM	500	Wants only to back up the data, mainly his pictures. Recycle laptop afterwards\r\n631 741 5947\r\nvmoses	665-SD	QNTech	\N	sinshiqaq	\N	\N	\N	\N
SV2112180423@@1	Resolved	2021-12-21 09:22:10.487-05	2021-12-21 09:32:45.519-05	SV2112180423	2021-12-17 19:00:00-05	f	718-506-7686	500	Symptom: Cable Management. radiator not detected on ICUE\r\nPassword: N/A\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: No data/ new build\r\nCurrent Security: ESET \r\nCondition: New Build\r\nCell (Text OK?): 718-506-7686\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	fpolorovira	CUST0901302326	\N	\N	\N
SV2112200882@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 09:22:10.541-05	2021-12-24 10:22:46.07-05	SV2112200882	2021-12-19 19:00:00-05	f	5165577986	201	Symptom: Does not turn anymore, recently switched out the power supply. used the same cables. also wants to test his old power supply. grpahics card fans do not spin \r\nPassword: no password \r\nApproved Services (Price): 40 for diag \r\nDate of Last Backup: data is backed up \r\nCurrent Security: does not have does not want \r\nCondition: mild wear \r\nCell (Text OK?):  5165577986\r\nDate and Time of Contact: 4-6 days\r\nKE: vmoses	665-SD	QNTech	\N	fpolorovira	CUST1707131700	service_order	Custom Build Desktop	\N
SV2112200357@@1	Resolved	2021-12-20 14:49:12.386-05	2021-12-24 10:22:41.814-05	SV2112200357	2021-12-19 19:00:00-05	f	5CD017FYTL	500	very slow in regular use. issues with wifi\r\npass: Vi3548180 / ask if needed\r\nnever backed up. declined dbu\r\nno av. declined eset\r\nhas 2yr accidental plan\r\ncell: 646-872-8517\r\nke: fpolorovira	665-SD	QNTech	145-1821122-1-1	asantisteban	CUST1403313453	service_order	**EF1072_3250U/8/256/156H	\N
SV2112160220@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.527-05	2021-12-22 15:08:56.895-05	SV2112160220	2021-12-15 19:00:00-05	f	k1703n0026169	208	swollen battery\r\npass: doesnt remember\r\n$40 for diagnostics. \r\n2-4 days for results\r\ncell: 917-286-2269\r\nnever backed up. may want backup if needed\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	tadams1	\N	service_order	Generic MSI Laptop	\N
SV2112200432@@1	Resolved	2021-12-21 09:22:10.375-05	2021-12-24 10:22:40.203-05	SV2112200432	2021-12-19 19:00:00-05	f	DLXZ718KKC5G	500	doesnt turn on\r\napplecare+\r\ncell: 917-968-2211\r\n1-2 weeks\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	IPHONE/IPAD	\N
SV2112190305@@1	Resolved	2021-12-21 09:22:10.485-05	2021-12-24 10:21:56.003-05	SV2112190305	2021-12-18 19:00:00-05	f	3478663512	500	Symptom: Ethernet port on motherboard is lose / not working \r\nPassword: does not believe there is a password \r\nApproved Services (Price): 40 \r\nDate of Last Backup: Nothing of important \r\nCurrent Security: Has one \r\nCondition: mild wear \r\nCell (Text OK?): 347 866 3512\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	vmoses	CUST2103177729	service_order	Custom Build Desktop	\N
SV2112220606@@1	Stat 4 - Waiting on customer approval/response	2021-12-24 10:25:35.657-05	2021-12-28 14:24:51.427-05	SV2112220606	2021-12-21 19:00:00-05	f	FVFFC8ZEQ6L7	208	display cracked\r\npass: Aishalove1234\r\ncell: 929-538-7543\r\nhas apple limited warranty\r\n3-5 days for diagnostics\r\nicloud backup. declined dbu\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"W" - Manufacturer's Warranty Repair
SV2112190455@@1	Resolved	2021-12-21 09:22:10.512-05	2021-12-22 15:08:39.64-05	SV2112190455	2021-12-18 19:00:00-05	f	06219p01104376	500	Does not post / delivered a week ago from IBuyPower\r\nGen Diag $39.99 + Tax\r\nPassword: Ask for Password\r\nDeclined backup / new computer no data on it\r\nno av\r\n917-783-2658\r\nasantisteban	665-SD	QNTech	\N	vmoses	CUST2006290283	service_order	Custom Build Desktop	\N
SV2112190267@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.449-05	2021-12-24 10:21:46.605-05	SV2112190267	2021-12-18 19:00:00-05	f	gx4zvstalkkt	205	sound/bass issues\r\napplecare +\r\n1-2 weeks\r\n929-575-2830 / 646-915-5786\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple AirPods Not MC Purch	\N
SV2111030466@@1	Resolved	2021-12-24 15:59:19.956-05	2021-12-24 16:22:48.771-05	SV2111030466	2021-11-02 20:00:00-04	f	5CG6477HB8	500	$40 Prepaid Diagnostic 5 - 7 business days.\r\nStorage is full. Computer seizes up and shuts down. Does not work reliably for regular use. \r\nCell: 718 926 2038\r\nAV: windows defender\r\nLast Backup: Never\r\nKE: erojas1	665-SD	QNTech	\N	tadams1	\N	service_order	HP_laptop	"X" - Diagnostic and Repair/Installation Service
SV2112170496@@1	Technician Assigned	2021-12-20 16:41:47.773-05	2021-12-22 15:08:46.965-05	SV2112170496	2021-12-16 19:00:00-05	f	QYHM99NQHD	200	cracked ipad\r\n$60 fee\r\n1-2 weeks\r\ncell: 929-261-7768\r\nke: fpolorovira	665-PR	QNTech	\N	erojas1	\N	service_order	IPHONE/IPAD	\N
SV2112140179@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.499-05	2021-12-21 15:27:20.377-05	SV2112140179	2021-12-13 19:00:00-05	f	H1CCHEZFLKKT	205	Apple Airpods Pro, crackling sound on the right side\r\nPhone: 917 335 5481\r\nvmoses	665-SD	QNTech	\N	sinshiqaq	CUST08011253802	\N	\N	\N
SV2112210248@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 15:26:31.16-05	2021-12-24 10:22:50.862-05	SV2112210248	2021-12-20 19:00:00-05	f	H6RDHHEW0C6L	201	AIRPOD PROS\r\nMICROPHONE AND SPEAKER NOT WORKING ON BOTH\r\nKE: ASANTISTEBAN	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple AirPods Not MC Purch	\N
SV2112210383@@1	Technician Assigned	2021-12-21 15:26:29.996-05	2021-12-24 10:22:55.584-05	SV2112210383	2021-12-20 19:00:00-05	f	\N	200	wallet - 325068 - $15.18\r\n2yr plan\r\nAsantisteban	665-SD	QNTech	145-1868874-1-1	asantisteban	CUST1708022691	service_order	**PELICAN_0955_SPORT_WALL	\N
SV2112210192@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 15:22:34.386-05	2021-12-24 10:22:52.38-05	SV2112210192	2021-12-20 19:00:00-05	f	C02ZF90FLYWG	205	Symptom: Down arrow key missing + up arrow key not functioning properly\r\nPassword: LoveToThemoon1212\r\nApproved Services (Price): AppleCare+\r\nDate of Last Backup: ICloud storage\r\nCurrent Security: none / declined\r\nCondition: mild wear / missing down arrow key\r\nCell (Text OK?): 929-450-8798\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112210402@@1	Waiting for product	2021-12-21 15:26:29.116-05	2021-12-24 10:22:14.486-05	SV2112210402	2021-12-20 19:00:00-05	f	K8N0LP018125352	100	Symptom: Screen randomnly turns black, especially moved forward or backward\r\nPassword: WLAMKAM1180! Pin: 1180 \r\nApproved Services (Price): 40 \r\nDate of Last Backup: backed up \r\nCurrent Security: malwarebytes \r\nCondition: mild wear \r\nCell (Text OK?): 347 639 8977 \r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	\N	\N	service_order	Asus laptop	\N
SV2110010366@@1	Invoiced	2021-12-24 12:45:34.636-05	2021-12-24 12:45:40.196-05	SV2110010366	2021-09-30 20:00:00-04	t	PF20ART1	900	Symptom: needs to be bios flashed\r\nPassword: n/a\r\nApproved Services (Price): under man. warranty\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 646-637-7434\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112180595@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.328-05	2021-12-24 10:21:30.876-05	SV2112180595	2021-12-17 19:00:00-05	f	C02J819GDR53	208	Symptom: Battery Replacement\r\nPassword: peewee60\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: 2 months ago\r\nCurrent Security: none\r\nCondition: mild wear\r\nCell (Text OK?): 917-453-5909\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112210385@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 15:22:41.447-05	2021-12-24 10:22:52.395-05	SV2112210385	2021-12-20 19:00:00-05	f	FVFFX7QNQ05D	205	Symptom: Cracked screen \r\nPassword: Danielsong5\r\nApproved Services (Price):\r\nDate of Last Backup: nothing important \r\nCurrent Security: does not have does not want  \r\nCondition: mild wear \r\nCell (Text OK?): 929 319 0203 \r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	sinshiqaq	CUST2107016029	service_order	Generic Apple Laptop	\N
SV2112210366@@1	Received in Shop - Unassigned	2021-12-21 15:26:29.225-05	2021-12-21 15:50:15.42-05	SV2112210366	2021-12-20 19:00:00-05	f	G90106112131175	101	data migration and ms office on his new pc \r\nrazer laptop pw: 6297\r\nphone 515 783 4085	665-SD	QNTech	\N	\N	CUST21121815234	\N	\N	\N
SV2112210302@@1	Resolved	2021-12-21 15:26:32.313-05	2021-12-24 10:21:57.448-05	SV2112210302	2021-12-20 19:00:00-05	f	FFWCT49ZPLK0	500	Symptom: CRACKED SCREEN\r\nPassword: KOOL\r\nApproved Services (Price): APPLECARE+\r\nDate of Last Backup: CLOUD\r\nCurrent Security: NONE\r\nCondition: CRACKED SCREEN\r\nCell (Text OK?): 347-249-7442\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple iPhone SE	\N
SV2112210419@@1	Technician Assigned	2021-12-21 15:26:30.692-05	2021-12-24 10:22:05.286-05	SV2112210419	2021-12-20 19:00:00-05	f	917-804-1641	200	install new board / PSU / GPU / cooler / CPU into old computer\r\n917-804-1641\r\nRebuild - $199.99\r\nKE: Asantisteban	665-SD	QNTech	\N	asantisteban	CUST1404054044	service_order	Custom Build Desktop	\N
SV2112210345@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-21 15:20:06.285-05	2021-12-24 10:22:52.402-05	SV2112210345	2021-12-20 19:00:00-05	f	CPWJP5KRDTY3	201	CSAT: Unit boots slow\\\r\nCourtesy Diagnostics\r\nHardware /Parts not covered\r\nPhone:	665-SD	QNTech	\N	sinshiqaq	CUST2108112114	service_order	Generic Apple Laptop	\N
SV2112210912@@1	Received in Shop - Unassigned	2021-12-22 15:08:12.748-05	2021-12-22 15:08:12.753-05	SV2112210912	2021-12-20 19:00:00-05	f	718-578-1909	101	Service(s): CPU Cooler and Fan Installation Service; Heatsinks are incredibly important to prevent any damage and overheating. (962951)\r\n\r\nnever backed up. declined dbu\r\nno av. declined eset\r\ncell: 718-578-1909\r\n1-2 days\r\nke: fpolorovira	665-SD	QNTech	\N	\N	CUST21122113261	service_order	Custom Build Desktop	\N
SV2112210202@@1	Received in Shop - Unassigned	2021-12-21 15:26:28.943-05	2021-12-24 10:22:20.252-05	SV2112210202	2021-12-20 19:00:00-05	f	NHQ53AA0019250FA112600	101	Symptom: Cracked screen \r\nPassword: does not remember \r\nback up: nothing important\r\nav: wants to fix the laptop first\r\nphone: 917 657 0189 \r\nvmoses	665-SD	QNTech	\N	\N	CUST2101055346	service_order	Acer Laptop	\N
SV2112230103@@1	Received in Shop - Unassigned	2021-12-23 14:41:05.644-05	2021-12-24 10:25:34.848-05	SV2112230103	2021-12-22 19:00:00-05	f	Invalid-145-604322-1-1	101	turns on for a second and then turns off\r\nno password\r\ncell: 718-506-4867 (cell)\r\n$40 for diagnostics\r\n3-5 for results\r\nnever backed up. wants dbu if needed\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	145-604322-1-1	\N	CUST1409080363	service_order	**55F0_5200U/6G/1TB/14/T	\N
SV2112210228@@1	Technician Assigned	2021-12-21 15:26:31.649-05	2021-12-21 16:01:30.453-05	SV2112210228	2021-12-20 19:00:00-05	f	FFMWRMAHJC6C	200	BATTERY REPLACEMENT - $49.99\r\nKE: ASANTISTEBAN\r\n718-658-7264 CALL ONLY	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple iPhone 8	\N
SV2112210354@@1	Technician Assigned	2021-12-21 15:26:29.072-05	2021-12-24 14:30:30.602-05	SV2112210354	2021-12-20 19:00:00-05	f	R90PSJS7	200	Issue: Display flicker / lines\r\nphone -9177415836	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	\N
SV2112200418@@1	Resolved	2021-12-20 15:04:41.9-05	2021-12-24 10:50:54.938-05	SV2112200418	2021-12-19 19:00:00-05	f	9172131304	500	Data Backup Option: Backup declined\r\nProblem Description: Nothing on monitor after switching on the computer for setup\r\nPhone: 917 213 1304 \r\nDate of last backup: Never. Unit has never been used.\r\nAV: Windefender.\r\nKE: erojas1	665-SD	QNTech	\N	asantisteban	CUST2112204575	service_order	Generic Desktop	\N
SV2112280216@@1	Received in Shop - Unassigned	2021-12-28 14:24:33.909-05	2021-12-28 15:13:34.871-05	SV2112280216	2021-12-27 19:00:00-05	f	2MD1272HY0	101	symptom: blue screens\r\npassword: 151962 \r\nback up nothing important \r\nav declined \r\nphone 718 450 5207 \r\nvmoses	665-SD	QNTech	145-2229555-3-1	\N	CUST2008239820	service_order	**TG01_5600G/8/256/1660/H	"W" - Manufacturer's Warranty Repair
SV2112271170@@1	Resolved	2021-12-28 14:40:08.597-05	2021-12-28 14:40:13.623-05	SV2112271170	2021-12-26 19:00:00-05	f	VNBNL7C3G4	500	Does not turn on\r\nSVK145-1470190-2-1\r\n$349.99	665-SD	QNTech	145-1470190-1-1	vmoses	CUST1405273704	service_order	**COLOR_LJ_PRO_MFP_M281FD	"PR" - Service Plan Replacement Contract
SV2112140301@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.223-05	2021-12-21 15:27:21.435-05	SV2112140301	2021-12-13 19:00:00-05	f	C1MVK814J1WK	205	Symptom: MacOS upgrade / Microsoft office upgrade. Wants to know why she cannot upgrade either and what can be done\r\nPassword: newyear2018\r\nApproved Services (Price): 40 for diag \r\nDate of Last Backup: is backed up\r\nCurrent Security: has eset but did not install yet \r\nCondition: mild wear \r\nCell (Text OK?): 917 685 2530\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	sinshiqaq	CUST1404264135	\N	\N	\N
SV2112140255@@1	Technician Assigned	2021-12-21 09:22:10.459-05	2021-12-21 15:27:22.763-05	SV2112140255	2021-12-13 19:00:00-05	f	Invalid-145-1846264-1-1	200	Symptom: Trackpad Issues\r\nPassword: ask for Password\r\nApproved Services (Price): 2yr accidental Damage\r\nDate of Last Backup: declined\r\nCurrent Security: declined\r\nCondition: mild wear\r\nCell (Text OK?): 917-402-1707\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	145-1846264-1-1	asantisteban	CUST2006197411	\N	\N	\N
SV2112210486@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 15:26:28.913-05	2021-12-24 10:22:48.897-05	SV2112210486	2021-12-20 19:00:00-05	f	FVFF13M7Q05G	205	Symptom: "L" key is not responding\r\nPassword: Asher\r\nApproved Services (Price): Apple Limited warranty\r\nDate of Last Backup: never / declined\r\nCurrent Security: none / declined\r\nCondition: mild wear\r\nCell (Text OK?): 347-465-3948\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112210370@@1	Resolved	2021-12-21 15:26:34.941-05	2021-12-24 10:22:51.355-05	SV2112210370	2021-12-20 19:00:00-05	f	SDMPCTT56MF3R	500	Symptom: cracked screen\r\nPassword: 7428\r\nApproved Services (Price): 2yr accidental plan\r\nDate of Last Backup: cloud / declined\r\nCurrent Security: none/ declined\r\nCondition: cracked screen\r\nCell (Text OK?): 917-868-2996\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	145-1868109-1-1	sinshiqaq	CUST1405100479	service_order	**IPAD7_L19_128_SV	\N
SV2111140107@@1	Resolved	2021-12-24 15:59:30.657-05	2021-12-24 17:41:30.637-05	SV2111140107	2021-11-13 19:00:00-05	f	5V7WSW1	500	Symptom: no display\r\nPassword: 7131\r\nApproved Services (Price): has 2yr dop plan\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 917-400-8582\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	145-1787123-1-1	fpolorovira	CUST1512313252	service_order	**7010_I5-3470_16/240/P	"P" - Service Plan Contract Coverage
SV2112160145@@1	Stat 2 - Part ordered; waiting on delivery	2021-12-21 09:22:10.418-05	2021-12-22 15:28:50.356-05	SV2112160145	2021-12-15 19:00:00-05	f	F3QF203	205	Symptom: Keyboard issues at first. now stuck on boot cycle \r\nPassword: 5810 / Skz22899\r\nApproved Services (Price): Gen Diag $39.99 + Tax\r\nDate of Last Backup: within last 10 days\r\nCurrent Security: McAfee ask after repair for ESET\r\nCondition: mild wear\r\nCell (Text OK?): 917-969-5502\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	tadams1	CUST1502241161	service_order	Dell Laptop	\N
SV2112210531@@1	Technician Assigned	2021-12-21 16:00:55.954-05	2021-12-24 10:22:16.267-05	SV2112210531	2021-12-20 19:00:00-05	f	SPF2BH8Y4	200	Symptom: screen issues, does not turn on anymore \r\nPassword: 2525\r\nApproved Services (Price):\r\nDate of Last Backup: only if necessary \r\nCurrent Security: when its fixed, maybe \r\nCondition: mild wear \r\nCell (Text OK?): 646 283 3419\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	145-2066279-7-1	asantisteban	CUST1605262605	service_order	**C740_I5-1021U/8/25614HT	\N
SV2111090462@@1	Invoiced	2021-12-24 15:59:26.162-05	2021-12-24 17:39:44.413-05	SV2111090462	2021-11-08 19:00:00-05	t	C02CVEM3MNHP	900	Symptom: unable to get past apple logo. find my device is on. customer will take it off at home.\r\nPassword: Areosa55\r\nApproved Services (Price): applecare+\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 718-607-9905 (cell)\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"W" - Manufacturer's Warranty Repair
SV2110120669@@1	Invoiced	2021-12-24 15:59:16.232-05	2021-12-24 16:22:57.493-05	SV2110120669	2021-10-11 20:00:00-04	t	9KF2230S10043	900	recently built\r\nfreezes at the desktop\r\n9292021339	665-SD	QNTech	145-2242306-2-1	mlim	CUST21031316796	service_order	AMD_RYZEN_9_5900X_WO_COOL	"D" - Direct Sale of Service Part
SV2102180177@@1	Invoiced	2021-12-24 11:40:09.244-05	2021-12-24 12:45:45.636-05	SV2102180177	2021-02-17 19:00:00-05	t	PF-2DATSD	900	General Diag overall unit / cosmetic damage assessment\r\nwants quote for repair\r\n3-4 days	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	\N
SV2110170460@@1	Resolved	2021-12-24 15:59:17.99-05	2021-12-24 16:23:10.44-05	SV2110170460	2021-10-16 20:00:00-04	f	5cd848549v	500	Symptom: hard drive error\r\nPassword: n/a\r\nApproved Services (Price): $40 + tax\r\nDate of Last Backup: never and wants one if needed\r\nCurrent Security: none and declined\r\nCondition: case is bent\r\nCell (Text OK?): 347-437-4918\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	sinshiqaq	CUST1803295309	service_order	HP_laptop	"X" - Diagnostic and Repair/Installation Service
SV2111050927@@1	Resolved	2021-12-24 15:59:23.213-05	2021-12-24 16:42:59.81-05	SV2111050927	2021-11-04 20:00:00-04	f	\N	500	3474557108 / 3475892141\r\ndata backup to 1tb ext drive	665-SD	QNTech	wccm1as12ka	pflaherty	CUST2111057411	service_order	Internal HDD	"N" - Upgrade/Installation of Customer-Owned Equipment
SV2112210771@@1	Received in Shop - Unassigned	2021-12-22 09:28:59.744-05	2021-12-24 10:22:11.71-05	SV2112210771	2021-12-20 19:00:00-05	f	GRQ7062	101	Symptom: Black screen, has a beeping sound and yellow light on bottom \r\nPassword: no password  \r\nApproved Services (Price): 40 for diag \r\nDate of Last Back Up: no important data \r\nCurrent Security: not now \r\nCondition: mild wear \r\nCall (Text OK?): 347 650 5963 \r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	\N	\N	CUST1404183542	service_order	Dell Laptop	\N
SV2112220489@@1	Waiting for product	2021-12-22 15:08:05.449-05	2021-12-24 10:22:24.945-05	SV2112220489	2021-12-21 19:00:00-05	f	K2107N0154109	100	Symptom: does not display / changed the bios settings for the graphics then would not turn on again\r\nPassword: 6969\r\nApproved Services (Price): Manf. Warranty\r\nDate of Last Backup: a month ago / declined\r\nCurrent Security: unsure / declined\r\nCondition: mild wear / screen stains\r\nCell (Text OK?): 917-587-4948\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	\N	\N	service_order	Generic MSI Laptop	\N
SV2110310545@@1	Resolved	2021-12-21 16:19:34.74-05	2021-12-21 16:19:34.783-05	SV2110310545	2021-10-30 20:00:00-04	f	B743091950368	500	Symptom: The unit randomly freezes, previously checked in under SV2107260428.\r\nPassword: 4Squared=16\r\nApproved Services (Price): Diag under warranty.\r\nDate of Last Backup: Backed up to External. DBU declined.\r\nCurrent Security: Norton. Mentioned ESET.\r\nCondition: Mild wear and tear.\r\nCell (Text OK?): 516.395.3595 (text okay)\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: mlim	665-SD	QNTech	145-1695751-1-1	tadams1	CUST1508232934	service_order	**B743_9700K/16/500/P	\N
SV2112210816@@1	Received in Shop - Unassigned	2021-12-22 09:28:47.839-05	2021-12-24 17:25:16.454-05	SV2112210816	2021-12-20 19:00:00-05	f	G436022153754	101	Symptom: blue screens, gets a recovery page, cannot find recovery environment, tried to factory reset\r\nPassword: bathtubboy2\r\nBack up:  nothing important \r\nav: if there is a virus\r\nphone: 646 210 5056 \r\nvmoses	665-SD	QNTech	145-2065122-1-1	\N	CUST1703150597	service_order	**G436_10700K32/1/3070/PG	\N
SV2112210684@@1	Resolved	2021-12-22 15:08:12.089-05	2021-12-24 10:22:49.178-05	SV2112210684	2021-12-20 19:00:00-05	f	DLXNM5R9G5V5	500	Does not charge or turn on, customer needs data on ipad.\r\nask for passcode\r\n917-608-2158 text ok\r\nmild wear\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple iPad Mini	\N
SV2112140118@@1	Stat 1 - Tech bench; active repair in progess	2021-12-20 16:15:39.271-05	2021-12-22 14:49:50.076-05	SV2112140118	2021-12-13 19:00:00-05	f	DNPDVJVJ0DY0	203	Symptom: Back Camera and Flashlight not working\r\nPassword: 567333\r\nApproved Services (Price): AppleCare +\r\nDate of Last Backup: icloud\r\nCurrent Security: none\r\nCondition: mild wear\r\nCell (Text OK?): 732-213-5938 \r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-PR	QNTech	\N	erojas1	\N	service_order	Apple iPhone 12	\N
SV2112220262@@1	Technician Assigned	2021-12-22 15:08:08.367-05	2021-12-22 15:08:08.373-05	SV2112220262	2021-12-21 19:00:00-05	f	CPWQ72YMG940	200	Data Migration onto new Macbook Air 2020 (C02G3B1PQ6L7)\r\n$80 for transfer $100 if removal of SSD required\r\nKE: Asantisteban\r\n917-940-7954	665-SD	QNTech	\N	asantisteban	CUST2001284849	service_order	Generic Apple Laptop	\N
SV2104080533@@1	Invoiced	2021-12-24 11:40:13.168-05	2021-12-24 12:42:54.441-05	SV2104080533	2021-04-07 20:00:00-04	t	PF2BNKY5	900	UDID error. Unit had mobo changed and boots with error message.\r\nPhone: 646 637 7434\r\ncondition: mild wear\r\nno data needed\r\nKE: achiarelli	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112210899@@1	Stat 4 - Waiting on customer approval/response	2021-12-22 15:08:10.136-05	2021-12-24 10:22:24.379-05	SV2112210899	2021-12-20 19:00:00-05	f	C02SX6XHGTFL	208	Name: LUIS VINANZACA\r\nPhone:5135602311\r\nIssue: No power	665-SD	QNTech	\N	sinshiqaq	CUST2108247464	service_order	Generic Apple Laptop	\N
SV2112220293@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-22 15:08:11.103-05	2021-12-24 10:25:41.1-05	SV2112220293	2021-12-21 19:00:00-05	f	C02L6920F8J2	201	Lines on screen when turned on\r\nPassword: N/a\r\nGen Diag ($39.99  +Tax)\r\n929-561-2373\r\nBackup: never / declined\r\nAntiVirus: none / declined\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple Desktop	\N
SV2112210804@@1	Technician Assigned	2021-12-22 09:28:35.467-05	2021-12-24 16:59:34.426-05	SV2112210804	2021-12-20 19:00:00-05	f	D07JK63	200	Symptom: Random blue screens (the continue, troubleshoot one) before turning on, fans go up and it gets hot. Intermittent powering on issues, even at high battery percentage. Right USB C port not working right. USB C on left not working either.\r\npassword: 2004\r\nback up: it is backed up\r\nav: not right now\r\nphone: 516 225 9936\r\nvmoses	665-PR	QNTech	145-2022969-2-1	erojas1	CUST1907123317	service_order	**X9500_10750H/16/1/156PT	"W" - Manufacturer's Warranty Repair
SV2104080523@@1	Invoiced	2021-12-24 11:40:24.515-05	2021-12-24 12:42:31.068-05	SV2104080523	2021-04-07 20:00:00-04	t	PF27AVCR	900	Fan error. Boots into error message then shuts off\r\nPhone: 646 637 7434\r\nKE: achiarelli\r\ncondition: mild wear\r\nno data needed\r\nKE: achiarelli	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2110140283@@1	Resolved	2021-12-24 15:59:16.517-05	2021-12-24 16:23:00.964-05	SV2110140283	2021-10-13 20:00:00-04	f	PF0QAQ7X	500	Symptom:NEW SSD INSTALLED / DOES NOT DETECT\r\nApproved Services (Price):40$DIAG\r\nCell (Text OK?):718 908 9865\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:DPALANZA	665-SD	QNTech	\N	tadams1	CUST080122344480	service_order	Lenovo Laptop	"X" - Diagnostic and Repair/Installation Service
SV2109080529@@1	Invoiced	2021-12-24 12:51:39.46-05	2021-12-24 12:51:39.636-05	SV2109080529	2021-09-07 20:00:00-04	t	R90PSJS7	900	refer to sv2108040217	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	\N
SV2111040811@@1	Resolved	2021-12-24 15:59:22.252-05	2021-12-24 16:23:06.043-05	SV2111040811	2021-11-03 20:00:00-04	f	9173376649	500	Symptom: no power\r\nPassword: 2020b\r\nApproved Services (Price): $40 + tax\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 917-337-6649\r\nDate and Time of Contact: at least 3-5 days\r\nKE: fpolorovira	665-SD	QNTech	\N	mlim	\N	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2110270159@@1	Resolved	2021-12-24 15:59:18.382-05	2021-12-24 16:22:56.65-05	SV2110270159	2021-10-26 20:00:00-04	f	C02TWH60J1WK	500	Symptom: User ran out of space on laptop, downloaded some programs to clean up disk space and now cannot download any files\r\nPassword: 03192003\r\nApproved Services (Price): Diag $39.99+tax\r\nDate of Last Backup: Backup declined, OK with OS reimage if necessary\r\nCurrent Security: Norton-may be expired, recommend ESET \r\nCondition: mild wear, no visible damage upon checkin\r\nCell (Text OK?): 516-473-9250-Sam 718-570-3539-mom\r\nDate and Time of Contact: at least 3-5 days for diagnostic result\r\nKE: paviles	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
SV2104080538@@1	Invoiced	2021-12-24 11:42:08.764-05	2021-12-24 12:44:26.516-05	SV2104080538	2021-04-07 20:00:00-04	t	PF27DRX1	900	screen has a small white splotch on panel that is visible under certain background colors. Possible defective screen. Issue gets worse the more unit is used.\r\nPhone: 646 637 7434\r\ncondition: mild wear\r\nno data needed\r\nKE: achiarelli	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2112220233@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-22 15:08:10.261-05	2021-12-24 10:25:43.887-05	SV2112220233	2021-12-21 19:00:00-05	f	D69GHQ23X1	201	fell face forward, cracked screen, no display\r\nAppleCare + w/ theft and loss\r\nPasscode: 966641\r\nPhone number: 614-400-9267 \r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple iPhone 12	\N
SV2112210633@@1	Stat 4 - Waiting on customer approval/response	2021-12-22 15:08:11.375-05	2021-12-24 10:22:51.141-05	SV2112210633	2021-12-20 19:00:00-05	f	SC02FN8MRQ6LC	208	Symptom: cracked screen \r\nPassword: BasketballandTans\r\nApproved Services (Price):\r\nDate of Last Back Up: only if necessary \r\nCurrent Security: has eset \r\nCondition: mild wear \r\nCall (Text OK?): 347 951 2826 \r\nDate and Time of Contact:\r\nKE: vmoses	665-SD	QNTech	145-2200056-1-1	sinshiqaq	CUST1404032486	service_order	MBA13_L20_M1/8/256_GD	\N
SV2112220377@@1	Received in Shop - Unassigned	2021-12-22 15:08:06.635-05	2021-12-24 10:25:38.058-05	SV2112220377	2021-12-21 19:00:00-05	f	347-707-0410	101	no power\r\npass: ask if needed\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n$40 + tax\r\n3-5 days for pickup\r\ncell:347-707-0410\r\nke: fpolorovira	665-SD	QNTech	\N	\N	\N	service_order	Custom Build Desktop	\N
SV2112220480@@1	Waiting for product	2021-12-22 15:08:05.438-05	2021-12-24 10:25:43.969-05	SV2112220480	2021-12-21 19:00:00-05	f	C09KRC2	100	Symptom: cracked screen and keyboard does not light up\r\nPassword: n/a\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: recently\r\nCurrent Security: none/ declined\r\nCondition: mild wear\r\nCell (Text OK?): 917-687-3249\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	145-910373-1-1	\N	CUST1701262919	service_order	**I15_7200U/8G/1TB/15.6	\N
SV2112220246@@1	Technician Assigned	2021-12-22 15:08:07.892-05	2021-12-24 10:35:23.836-05	SV2112220246	2021-12-21 19:00:00-05	f	6462942854	200	Airpods checked in under warranty. 4 - 6 days apple order.\r\nOne side makes staticy scratchy noise.\r\nPhone: 646 294 2854 (Text OK)\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	CUST20092811928	service_order	Apple AirPods Not MC Purch	\N
SV2108040217@@3	Invoiced	2021-12-24 12:46:23.832-05	2021-12-24 14:31:48.82-05	SV2108040217	2021-08-03 20:00:00-04	t	R90PSJS7	900	Symptom: After about 10-15 minutes screen goes black with just a grey line across the top. Once machine is restarted it will work for another 10-15 minutes before issue comes back\r\nPassword: Pin was removed for check in\r\nApproved Services (Price): $40 plus tax diagnostic\r\nDate of Last Backup: Has a data back up, no data needed declined DBU\r\nCurrent Security: Has a Norton Sub program justy ins't installed\r\nCondition: mild wear\r\nCell (Text OK?):  917-741-5836\r\nDate and Time of Contact: at least 3-5 days for diagnostic result\r\nKE: paviles	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	\N
SV2111030283@@1	Resolved	2021-12-24 15:59:19.652-05	2021-12-24 16:22:50.847-05	SV2111030283	2021-11-02 20:00:00-04	f	5CD0431SHP	500	Symptom: touchpad doesnt work sometimes / no volume / bottom case on left side is loose\r\nPassword: Eternity11\r\nApproved Services (Price): under man. warranty\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 646-755-0065\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	145-1980475-1-1	tadams1	CUST20112211450	service_order	**EF1072_3250U/8/256/156H	"W" - Manufacturer's Warranty Repair
SV2112230541@@1	Received in Shop - Unassigned	2021-12-24 09:10:52.772-05	2021-12-24 10:34:59.68-05	SV2112230541	2021-12-22 19:00:00-05	f	MSB0Y2L1S0102383	101	no display\r\npass: 6675\r\ncell: 757-509-1034\r\nnever backed up. declined dbu\r\nno av. declined eset\r\nunder man. warranty and has 3 yr dop plan\r\nke: fpolorovira	665-SD	QNTech	145-2090160-1-1	\N	CUST21031713316	service_order	**CR_10400F/16/512/2060SH	\N
SV2112220087@@1	Waiting for product	2021-12-22 15:08:09.168-05	2021-12-24 10:25:40.327-05	SV2112220087	2021-12-21 19:00:00-05	f	GS5FDZ1	100	$40 Prepaid Diagnostic 3 - 5 days\r\nSymptom: Alert message popped up and they remoted in. Computer seems to be seriously compromised.\r\nReach out for password.\r\nCell: 917 862 3468 (Text OK)\r\nDate of last backup: Never. Customer interested in data backup.\r\nAV: Unknown\r\nKE: erojas1	\N	QNTech	\N	\N	CUST1206012964	service_order	Dell_desktop	\N
SV2112230131@@1	Technician Assigned	2021-12-23 15:46:03.739-05	2021-12-24 10:25:36.462-05	SV2112230131	2021-12-22 19:00:00-05	f	W81017THATM	200	$40 prepaid diagnostic.  3 - 5 days.\r\nPassword: Abc1234\r\nCell: 718 928 4968 (Text OK)\r\nUpper right part of keyboard does not work. 0 P Semicolon and volume keys do not work. \r\nCustomer also keeps getting "This connection is not private" message on their browser. \r\nWorried about potential virus, wants looking into.\r\n\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	CUST1907101451	service_order	Generic Apple Laptop	\N
SV2112160396@@1	Resolved	2021-12-21 09:22:10.389-05	2021-12-22 15:08:53.788-05	SV2112160396	2021-12-15 19:00:00-05	f	W894009691t	500	Symptom: DVD Drive not working, does not accept or eject. Some keys do not work\r\nPassword: Corb3tt\r\nApproved Services (Price): Gen Diag $39.99 + Tax\r\nDate of Last Backup: would like backup done ($99.99 + Tax) will bring their own drive\r\nCurrent Security: ask again after repair\r\nCondition: mild repair\r\nCell (Text OK?): 347-691-4933\r\nDate and Time of Contact: 2-3 days\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	CUST2110141752	service_order	Generic Apple Laptop	\N
SV2112170156@@1	Technician Assigned	2021-12-21 09:22:10.463-05	2021-12-24 10:23:54.239-05	SV2112170156	2021-12-16 19:00:00-05	f	5CD9451G6P	200	Cell: 718 762 1195 (call)\r\nAddendum: Customer states bluetooth does not work on machine. Bluetooth devices tested with others, but they do not worko n this one.\r\nScreen detached from the hinges on its own.\r\nPassword: RLCohen17SMP\r\nCheck in condition: Minor signs of impact along the bottom of the keyboard.\r\nCovered under protection plan at manager discretion.\r\nKE: erojas1	665-SD	QNTech	145-1699722-1-1	tadams1	CUST1502123037	service_order	**CS30711065G716/512/15.6	\N
SV2112170277@@1	Stat 4 - Waiting on customer approval/response	2021-12-21 09:22:10.266-05	2021-12-24 10:24:47.434-05	SV2112170277	2021-12-16 19:00:00-05	f	F0M7P03	208	Symptom: Fans making noise, overheating (Laptop just used as a monitor)\r\nPassword: 1954\r\nApproved Services (Price): Gen Diag $39.99 + Tax\r\nDate of Last Backup: nothing on it / used as a monitor\r\nCurrent Security: none / declined\r\nCondition: mild wear\r\nCell (Text OK?): 718-810-8319\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	vmoses	CUST1408151886	service_order	Dell Laptop	\N
SV2112230376@@1	Received in Shop - Unassigned	2021-12-23 15:40:02.388-05	2021-12-24 10:25:26.828-05	SV2112230376	2021-12-22 19:00:00-05	f	8CG9474698	101	Symptom: battery issues, gets a red light when plugged in, does not rtun on \r\npassword: D1964\r\nback up: declined\r\nav: yes, eset\r\nphone: 347 322 2974\r\nvmoses	665-SD	QNTech	\N	\N	CUST1102125470	service_order	HP/Compaq_laptop	\N
SV2112230353@@1	Received in Shop - Unassigned	2021-12-23 17:10:31.993-05	2021-12-24 10:25:24.899-05	SV2112230353	2021-12-22 19:00:00-05	f	cs450140mb454304081319	101	Symptom: PC crashed, doesnt display anymore \r\nPassword: 0128 \r\nBack up: No \r\nAV: no and not interested\r\nphone: 347 977 5848\r\nvmoses	665-SD	QNTech	\N	\N	CUST21010717301	service_order	Generic Desktop	\N
SV2107020115@@1	Resolved	2021-12-24 12:10:22.632-05	2021-12-24 12:10:22.862-05	SV2107020115	2021-07-01 20:00:00-04	f	Invalid-145-1850148-1-1	500	Symptom: UNIT GETS SCALDING HOT/ AS WELL AS CHARGER\r\nApproved Services (Price): 40$ DIAG REQUESTED\r\nCell (Text OK?): 3473929568\r\nDate and Time of Contact: at least 72 business hours for diagnostic result	665-SD	QNTech	145-1850148-1-1	sinshiqaq	CUST2006231881	service_order	**A515_10210U/8/512/15.6	\N
SV2112230052@@1	Waiting for product	2021-12-23 14:58:47.877-05	2021-12-24 11:26:36.153-05	SV2112230052	2021-12-22 19:00:00-05	f	s5169837206	100	Unit will sometimes boot and then crash to a black screen after 20 plus minutes then when it turns on again will go to BIOs\r\n5169837206 \r\nHas data backed up\r\nBitdefender	665-SD	QNTech	\N	\N	CUST1601182718	service_order	Custom Build Desktop	\N
SV2112230151@@1	Received in Shop - Unassigned	2021-12-23 15:39:12.181-05	2021-12-24 10:35:09.973-05	SV2112230151	2021-12-22 19:00:00-05	f	347-720-7024	101	no display/post\r\npass: 5059\r\ncell: 347-720-7024\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n$40 + tax for diagnostics\r\n3-5  for results\r\nke: fpolorovira	665-SD	QNTech	\N	\N	CUST2009103446	service_order	Custom Build Desktop	\N
SV2112240333@@1	Received in Shop - Unassigned	2021-12-24 14:23:43.079-05	2021-12-24 14:23:44.267-05	SV2112240333	2021-12-23 19:00:00-05	f	h33f2czn0c6l	101	sound issues\r\nlimited warranty\r\ncell: 646-250-4737-\r\n1-2 weeks\r\nke: fpolorovira	665-SD	QNTech	\N	\N	\N	service_order	Apple AirPods Not MC Purch	\N
SV2112230389@@1	Technician Assigned	2021-12-23 14:41:07.819-05	2021-12-24 10:25:29.656-05	SV2112230389	2021-12-22 19:00:00-05	f	h19f16cn0c6l	200	Symptom: Right airpod not working properly\r\nApproved Services (Price): Apple Limited Warranty\r\nCondition: mild wear\r\nCell (Text OK?): 718-864-3887\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	CUST2111124468	service_order	Apple AirPods Not MC Purch	\N
SV2112230316@@1	Received in Shop - Unassigned	2021-12-23 15:40:04.066-05	2021-12-24 10:25:25.199-05	SV2112230316	2021-12-22 19:00:00-05	f	60M5203	101	Symptom: water spilled o nthe laptop, wont turn on \r\nPassword: 0718\r\nApproved Services (Price):\r\nDate of Last Backup: nothing important \r\nCurrent Security: has it \r\nCondition: mild wear \r\nCell (Text OK?): 917 530 3442\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE:  vmoses	665-SD	QNTech	\N	\N	CUST1911071452	service_order	Dell Laptop	\N
SV2112220866@@1	Received in Shop - Unassigned	2021-12-23 17:08:34.481-05	2021-12-24 10:22:24.914-05	SV2112220866	2021-12-21 19:00:00-05	f	PC0K40PX	101	doesnt turn on.\r\npass: ask if needed\r\ncell: 857-615-3093\r\nnever backed up. declined dbu\r\nno av. declined eset\r\n$40 for diagnostics\r\n3-5 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	\N	\N	service_order	Lenovo Laptop	\N
SV2112230240@@1	Resolved	2021-12-23 17:08:52.324-05	2021-12-23 17:08:53.707-05	SV2112230240	2021-12-22 19:00:00-05	f	SPF2FFWJF	500	customer wants to transfer files from dell to lenovo laptop. also install eset\r\n$130 + tax\r\n1-2 days \r\ncell: 917-533-4306\r\nke: fpolorovira	665-SD	QNTech	145-2303451-1-1	fpolorovira	CUST20082912588	service_order	V14_I5-1035G1/8/256/14P	\N
SV2112230390@@1	Received in Shop - Unassigned	2021-12-23 15:39:12.779-05	2021-12-24 10:25:27.015-05	SV2112230390	2021-12-22 19:00:00-05	f	PF1DR5DR	101	internet doesnt work. connects to wifi but no internet.\r\nno password\r\ncell: 718-640-4245\r\n$40 + tax for diagnostics\r\n3-5 days for results\r\nbacked up recently. unsure of dbu\r\nno av. declined eset\r\nke:fpolorovira	665-SD	QNTech	\N	\N	CUST1812284142	service_order	Lenovo Laptop	\N
SV2112230060@@1	Received in Shop - Unassigned	2021-12-23 14:41:07.175-05	2021-12-24 10:35:14.125-05	SV2112230060	2021-12-22 19:00:00-05	f	8CG0442JSC	101	no display. power button is stuck\r\nno password\r\ncell: 646-831-6663\r\nnever backed up. may want dbu\r\nhas eset\r\n$40 for diagnostics\r\n3-5 days for results\r\nke: fpolorovira	665-SD	QNTech	145-1998137-1-1	\N	CUST2012094720	service_order	**DQ20521135G7/8/51215.6T	\N
SV2111110129@@1	Invoiced	2021-12-24 15:59:27.041-05	2021-12-24 18:48:48.393-05	SV2111110129	2021-11-10 19:00:00-05	t	G358052040188	900	Symptom: The unit crashes when booting up or Apex Legends and COD.\r\nPassword: 1127\r\nApproved Services (Price): Diag, $39.99 +tax.\r\nDate of Last Backup: Haven't. Nothing important. DBU declined.\r\nCurrent Security: Doesn't know.Mentioned ESET.\r\nCondition: Mild wear and tear.\r\nCell (Text OK?): 347.369.0575 (text okay)\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: mlim	665-SD	QNTech	145-1841823-1-1	fpolorovira	CUST1903222077	service_order	**G358_10700/32/1/57XT/P/	"X" - Diagnostic and Repair/Installation Service
SV2112240344@@1	Received in Shop - Unassigned	2021-12-24 14:23:47.545-05	2021-12-24 14:23:47.567-05	SV2112240344	2021-12-23 19:00:00-05	f	5CD8430LSP	101	Symptom: laptop casing is broken\r\nPassword: does not want to give \r\nApproved Services (Price): 40 \r\nDate of Last Backup: only if needed \r\nCurrent Security: declined \r\nCondition: broken \r\nCell (Text OK?): 516 937 8977\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: vmoses	665-SD	QNTech	\N	\N	\N	service_order	HP/Compaq_laptop	\N
SV2112210170@@1	Technician Assigned	2021-12-21 15:26:28.745-05	2021-12-24 10:22:49.067-05	SV2112210170	2021-12-20 19:00:00-05	f	5CD8059213	200	$40 Prepaid Diagnostic. 3 - 5 days.\r\nIssue: Unit will not boot. Hangs on HP logo.\r\nCustomer ran HP diagnostics but they failed at 99%.\r\nESET was installed recently. Customer would like to ensure that we keep it.\r\nCell: 929 232 0345 (Text OK).\r\nKE: erojas1	665-SD	QNTech	145-1443788-1-1	vmoses	CUST071219461976	service_order	**450_G5_8250/8G/1TB/15	\N
SV2111160540@@1	Resolved	2021-12-24 15:59:33.18-05	2021-12-24 17:41:31.772-05	SV2111160540	2021-11-15 19:00:00-05	f	8R7YZZ2	500	random blue screens\r\ncell:  929-235-6937 (preferred) / 718-749-2887 \r\npass: 4495\r\ndell adh\r\ndeclined dbu and eset\r\n2-4 days for diagnostics results\r\nke: fpolorovira	665-SD	QNTech	145-1918540-10-1	tadams1	CUST2009145319	service_order	**I5501_1035G18/512/15.6H	"W" - Manufacturer's Warranty Repair
SV2112230762@@1	Received in Shop - Unassigned	2021-12-24 10:20:34.804-05	2021-12-24 10:25:22.389-05	SV2112230762	2021-12-22 19:00:00-05	f	GVNJV42	101	Customer wants to know if computer can be upgraded to support software (2020spaces.com 2020DesignLive) says computer runs slow and wants improvement. Either upgrade or purchase new computer\r\nPassword: munch2464 or munch2462\r\nAV: none / ask after Diag\r\nBackup: none / ask after Diag or Data Migration\r\nCondition: mild wear\r\nPhone: 917-596-4018\r\nKE: Asantisteban	665-SD	QNTech	\N	\N	\N	service_order	Dell_desktop	\N
SV2112230557@@1	Received in Shop - Unassigned	2021-12-24 09:09:39.681-05	2021-12-24 12:03:37.042-05	SV2112230557	2021-12-22 19:00:00-05	f	L9N0CV12C20438C	101	customer thinks laptop has been water damaged. no power\r\npass: ask if needed\r\ncell: 646-770-3236\r\nunder man. warranty. also has 1 yr accidental\r\nnever backed up. wants dbu if needed\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	145-2099469-6-1	\N	CUST21032716057	service_order	**Q407IQR5-4500U/8/25614H	\N
SV2112230678@@1	Received in Shop - Unassigned	2021-12-24 10:20:39.664-05	2021-12-24 10:25:22.518-05	SV2112230678	2021-12-22 19:00:00-05	f	s985s7t2	101	Symptom: boot loop\r\nPassword: no password\r\nBack up: only if needed\r\nav: has it \r\nphone: 917 412 1953\r\nvmoses	665-SD	QNTech	\N	\N	CUST1404011526	service_order	Dell Laptop	\N
SV2111040509@@1	Resolved	2021-12-24 15:59:22.684-05	2021-12-24 16:36:49.995-05	SV2111040509	2021-11-03 20:00:00-04	f	PF0P2SHQ	500	DIAGS 3 TO 5 DAYS, CHARGE PORT RELATED\r\nPH# 9177343713	665-SD	QNTech	\N	tadams1	CUST2104215078	service_order	Lenovo Idea laptop	"X" - Diagnostic and Repair/Installation Service
SV2112270095@@1	Received in Shop - Unassigned	2021-12-28 14:39:55.411-05	2021-12-28 14:39:55.542-05	SV2112270095	2021-12-26 19:00:00-05	f	917-671-7866	101	tier 2 build. wants to replace one of the provided fans with the one on top\r\n$200 prepaid\r\nno data\r\nno av. declined eset\r\ncell: 917-671-7866\r\n3-5 days\r\nke: fpolorovira	665-SD	QNTech	\N	\N	\N	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112230455@@1	Received in Shop - Unassigned	2021-12-24 10:20:30.292-05	2021-12-24 10:34:46.176-05	SV2112230455	2021-12-22 19:00:00-05	f	NXMFVAA0064010C4BC3400	101	symptom:  certain keys do not work "q" "p" "j" "left arrow" , took his hard drive\r\nemail (no phone): krichel@openlib.org	665-SD	QNTech	\N	\N	CUST1001292516	service_order	Acer Laptop	\N
SV2106170451@@1	Invoiced	2021-12-24 12:10:55.989-05	2021-12-24 12:45:42.06-05	SV2106170451	2021-06-16 20:00:00-04	t	SL11B03769	900	Error beeps\r\nUser unplugged battery internally to prevent sounds\r\n3-5 days for diag call back	665-SD	QNTech	\N	tadams1	CUST2009083408	service_order	Lenovo Laptop	\N
SV2111150529@@1	Resolved	2021-12-24 15:59:33.644-05	2021-12-24 17:41:31.833-05	SV2111150529	2021-11-14 19:00:00-05	f	G6TZX17FN70H	500	SN: G6TZX17FN70H\r\nPhone does not get service at all.\r\nTatyana Winnik\r\nCell: 973 687 7950\r\nPIN: 8284\r\nWill disable find my device.\r\nChecked in under apple warranty.\r\nKE: erojas1	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple iPhone 11 Pro Max	"W" - Manufacturer's Warranty Repair
SV2112240326@@1	Technician Assigned	2021-12-24 14:23:44.816-05	2021-12-24 14:23:45.171-05	SV2112240326	2021-12-23 19:00:00-05	f	\N	200	4TB Data Recovery - $2500 - Gillware - $50 deposit\r\nASantisteban\r\n201-786-8884	665-SD	QNTech	1teapf-500	asantisteban	\N	service_order	HD Drive	\N
SV2112220423@@1	Technician Assigned	2021-12-22 15:08:05.866-05	2021-12-24 18:28:24.102-05	SV2112220423	2021-12-21 19:00:00-05	f	C96RYZ2	200	computer is slow to load programs. hard drive is almost full. also turns off randomly\r\npass: Aibl24402\r\ncell: 917-224-3157\r\nhas man. warranty\r\nnever backed up. wants dbu if needed\r\nno av. declined eset\r\n3-5 days\r\nke: fpolorovira	665-SD	QNTech	\N	fpolorovira	CUST1301112313	service_order	Dell Laptop	"W" - Manufacturer's Warranty Repair
SV2111160472@@1	Resolved	2021-12-24 15:59:35.447-05	2021-12-24 17:41:28.502-05	SV2111160472	2021-11-15 19:00:00-05	f	FVFZQ9C4LYWL	500	sometimes screen turns on but no display\r\npass: 110313\r\ndeclined dbu and eset\r\ncell: 626-500-6161\r\n$40 for diagnostics. 2-4 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
SV2111110171@@1	Invoiced	2021-12-24 15:59:26.639-05	2021-12-24 18:47:54.629-05	SV2111110171	2021-11-10 19:00:00-05	t	k4n0cv01516214f	900	Symptom: Certain keys on keyboard unresponsive\r\nPassword: EL9175203356\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: none / declined\r\nCurrent Security: none / declined\r\nCondition: mild wear / keyboard not working\r\nCell (Text OK?): 917-520-3356\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: asantisteban	665-SD	QNTech	\N	fpolorovira	CUST1906233908	service_order	Asus laptop	"X" - Diagnostic and Repair/Installation Service
SV2112280091@@1	Waiting for product	2021-12-28 14:24:37.011-05	2021-12-28 14:39:51.199-05	SV2112280091	2021-12-27 19:00:00-05	f	PF30SX8KPF9XB1621134	100	$40 Prepaid Diagnostic 3 - 5 days\r\nChecked in by: Justyna Kunat-Borek\r\nBroken Screen. Not covered under warranty.\r\nDate of last backup: Unknown\r\nAV: Windefender\r\n646 247 1641\r\nKE: erojas1	665-SD	QNTech	145-2274521-2-1	\N	CUST2111071453	service_order	IP5_1135G7/8/256/15.6T	"X" - Diagnostic and Repair/Installation Service
SV2111130903@@1	Invoiced	2021-12-24 15:59:29.071-05	2021-12-24 18:56:35.833-05	SV2111130903	2021-11-12 19:00:00-05	t	6464021559	900	6464021559\r\nbooting issues, powers off after about 20 minutes\r\ndata needed, av -unknown	665-SD	QNTech	\N	tadams1	CUST2108060663	service_order	Generic Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112210443@@1	Resolved	2021-12-21 15:26:28.99-05	2021-12-24 14:25:11.176-05	SV2112210443	2021-12-20 19:00:00-05	f	3S3FZB2	500	Symptom: does not show network card on device manager. dropped 2 feet from couch to floor\r\nPassword: 1968\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: One drive / declined\r\nCurrent Security: Windows Defender\r\nCondition: Mild wear / stickers\r\nCell (Text OK?): 347-742-1281\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	asantisteban	CUST2007268459	service_order	Dell Laptop	\N
SV2102050457@@1	Invoiced	2021-12-24 14:29:51.914-05	2021-12-24 14:29:51.944-05	SV2102050457	2021-02-04 19:00:00-05	t	MP1NJ0D4	900	Laptop does not turn on or show signs of life \r\nDBU request	665-SD	QNTech	\N	tadams1	CUST21020410029	service_order	Lenovo Idea laptop	\N
SV2112220591@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-24 10:22:37.202-05	2021-12-24 10:25:40.102-05	SV2112220591	2021-12-21 19:00:00-05	f	C02GLNZSDV7M	201	Symptom: Battery issues / does not turn on\r\nPassword: ask for password\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: never / ask after repair\r\nCurrent Security: none / declined\r\nCondition: mild wear / dry adhesive from case\r\nCell (Text OK?): 917-541-2210\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2112220638@@1	Received in Shop - Unassigned	2021-12-23 14:53:47.927-05	2021-12-24 14:27:23.667-05	SV2112220638	2021-12-21 19:00:00-05	f	G162012052072	101	Symptom: Does not show display / customer took it apart to clean and when they put it back together no display\r\nPassword: 2004\r\nApproved Services (Price): Extension Protection\r\nDate of Last Backup: never / declined\r\nCurrent Security: ESET\r\nCondition: mild wear\r\nCell (Text OK?): 929-928-2613\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	145-1789092-1-1	\N	CUST1407181184	service_order	**G162_27X/16/250RX580/HG	\N
SV2112220621@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-24 10:22:35.575-05	2021-12-24 10:25:40.143-05	SV2112220621	2021-12-21 19:00:00-05	f	c02st0crhv5h	201	no display\r\npass: LotusFlower@2020\r\ncell: 646-660-0032\r\n$40 for diagnostics\r\n3-5 for results\r\nicloud backup but unsure if they want dbu\r\nno av. declined eset\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	\N
SV2111060216@@1	Invoiced	2021-12-24 15:59:23.749-05	2021-12-24 17:10:20.947-05	SV2111060216	2021-11-05 20:00:00-04	t	CNF0423GZF	900	Symptom: No display. Hasn't been used within 2 yrs\r\nPassword: unsure\r\nApproved Services (Price): Gen Diag. ($39.99 + Tax)\r\nDate of Last Backup: declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 347-703-3513\r\nDate and Time of Contact: at least 3-5 business days for diagnostic result\r\nKE:Asantisteban	665-SD	QNTech	\N	tadams1	CUST1105181899	service_order	HP/Compaq_laptop	"X" - Diagnostic and Repair/Installation Service
SV2111080257@@1	Resolved	2021-12-24 15:59:25.596-05	2021-12-24 16:22:55.691-05	SV2111080257	2021-11-07 19:00:00-05	f	6468812230	500	No Power\r\nP/W: 1999 / Halochamp11 / Awesomeshit1\r\nPrice: $40 Plus Tax\r\nBackups - None and wants DBU if needed\r\nAntivirus - None and Declined \r\nCell Number: 646 881 2230\r\ncondition:  mild wear  / no cpu in computer. customer brought it in bag\r\n4-6 Days\r\nFPolorovira	665-SD	QNTech	\N	sinshiqaq	CUST1909204455	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2102180184@@1	Invoiced	2021-12-24 12:14:57.956-05	2021-12-24 12:44:34.815-05	SV2102180184	2021-02-17 19:00:00-05	t	PF-2DBKA2	900	No camera detected\r\n3-4 days for call back	665-SD	QNTech	\N	tadams1	CUST1511072818	service_order	Lenovo Laptop	\N
SV2111120202@@1	Invoiced	2021-12-24 15:59:27.829-05	2021-12-24 18:49:44.525-05	SV2111120202	2021-11-11 19:00:00-05	t	PF1E66H8	900	Symptom: won't turn on, light blinks 3 times, fans spin, no display\r\nPassword: N/A\r\nApproved Services (Price): Manf. Warranty\r\nDate of Last Backup: declined\r\nCurrent Security: declined\r\nCondition: Mild wear\r\nCell (Text OK?): 510-589-7906\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	tadams1	\N	service_order	Lenovo Laptop	"W" - Manufacturer's Warranty Repair
SV2111160583@@1	Resolved	2021-12-24 15:59:34.986-05	2021-12-24 17:41:33.513-05	SV2111160583	2021-11-15 19:00:00-05	f	78RB6F2	500	power button no longer works	665-SD	QNTech	145-1103809-1-1	mlim	CUST080114196746	service_order	**I13_7200U/8G1TB/13.3/RT	"P" - Service Plan Contract Coverage
SV2110280668@@1	Resolved	2021-12-24 15:59:19.45-05	2021-12-24 16:23:05.898-05	SV2110280668	2021-10-27 20:00:00-04	f	9293694396	500	Symptom: recent build. no power/boot\r\nPassword: n/a\r\nApproved Services (Price): $40 + tax\r\nDate of Last Backup: never and declined\r\nCurrent Security: none and declined\r\nCondition: mild wear\r\nCell (Text OK?): 929-369-4396\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: fpolorovira	665-SD	QNTech	\N	pflaherty	CUST2103317688	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112210528@@1	Technician Assigned	2021-12-21 16:01:05.572-05	2021-12-24 17:04:23.935-05	SV2112210528	2021-12-20 19:00:00-05	f	K2104N0106827	200	Symptom: "K" key came off\r\nPassword: 9090336\r\nApproved Services (Price): Manf. Warranty\r\nDate of Last Backup: none / declined\r\nCurrent Security: none/ declined\r\nCondition: mild wear / stickers\r\nCell (Text OK?): 347-859-1269\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	145-2220547-1-1	asantisteban	CUST2108305859	service_order	GF66_11800H/16/512/15.6HG	"W" - Manufacturer's Warranty Repair
SV2111080182@@1	Invoiced	2021-12-24 15:59:25.024-05	2021-12-24 17:19:11.113-05	SV2111080182	2021-11-07 19:00:00-05	t	C02DF9FCML7L	900	Symptom: The unit has display issues after being hit from the back of the display by accident.\r\nPassword: 0508 (Find my device is off)\r\nApproved Services (Price): Diag, $39.99 +tax.\r\nDate of Last Backup: iCloud, nothing important. DBU declined.\r\nCurrent Security: No. Mentioned ESET.\r\nCondition: Mild wear and tear, display was hit from the back and may have damage.\r\nCell (Text OK?): 917.686.2107 (text okay)\r\nDate and Time of Contact: at least 3-5 days for diagnostic result\r\nKE: mlim	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
SV2111080238@@1	Invoiced	2021-12-24 15:59:25.517-05	2021-12-24 17:35:25.88-05	SV2111080238	2021-11-07 19:00:00-05	t	C2QND05ZFTPY	900	Symptom: The customer would like a battery replacement.\r\nPassword: Ianisanasshole!\r\nApproved Services (Price): Diag, $39.99 +tax.\r\nDate of Last Backup: Last week. Nothing important. DBU declined.\r\nCurrent Security: Not sure. Mentioned ESET.\r\nCondition: Mild wear and tear. Scatches on exterior of the bottom case and dent on the right of the touch pad.\r\nCell (Text OK?): 516.512.1386 (text okay)\r\nDate and Time of Contact: at least 3-5 days diagnostic result\r\nKE: mlim	665-SD	QNTech	\N	sinshiqaq	CUST1409230883	service_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
SV2112280102@@1	Technician Assigned	2021-12-28 14:25:04.069-05	2021-12-28 14:39:54.07-05	SV2112280102	2021-12-27 19:00:00-05	f	FVFFNBFWQ6LC	200	Symptom: Cracked screen\r\nPassword: 12xu\r\nApproved Services (Price): AppleCare +\r\nDate of Last Backup: recently\r\nCurrent Security: none\r\nCondition: mild wear\r\nCell (Text OK?): 917-864-2431\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	CUST1405114089	service_order	Generic Apple Laptop	"W" - Manufacturer's Warranty Repair
SV2111140477@@1	Resolved	2021-12-24 15:59:30.297-05	2021-12-24 17:41:34.194-05	SV2111140477	2021-11-13 19:00:00-05	f	C02LMDF8FGYY	500	Symptom: The unit is no longer functioning properly, battery may be swelling.\r\nPassword: mori2020 (Rebecca)\r\nApproved Services (Price): Diag, $39.99 +tax.\r\nDate of Last Backup: A long time ago. Nothing important. DBU declined.\r\nCurrent Security: No. Mentioned ESET.\r\nCondition: Medium wear and tear, rust in ports\r\nCell (Text OK?): 917.498.0431 (text okay) \r\nDate and Time of Contact: 3-5 days\r\nKE: mlim	665-SD	QNTech	\N	sinshiqaq	CUST2101235750	service_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
SV2112280405@@1	Technician Assigned	2021-12-28 14:24:31.122-05	2021-12-28 15:13:34.867-05	SV2112280405	2021-12-27 19:00:00-05	f	w8744a2gx85	200	Symptom: Power cuts on and off / freezes as well\r\nPassword: none\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: recently / declined\r\nCurrent Security: none / declined\r\nCondition:  wear / tape on back / dust and dirt\r\nCell (Text OK?): 917-567-9591\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Apple Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112270178@@1	Received in Shop - Unassigned	2021-12-28 14:39:54.766-05	2021-12-28 15:06:58.595-05	SV2112270178	2021-12-26 19:00:00-05	f	917-520-3710	101	computer has a slow boot up time\r\npass: 35474\r\ncell: 917-520-3710\r\nbacked up recently. declined dbu\r\nno av. declined eset\r\n$40 + tax for diagnostics\r\n3-5 days for results\r\nke: fpolorovira	665-SD	QNTech	\N	\N	CUST2112223147	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112220587@@1	Resolved	2021-12-24 10:25:33.142-05	2021-12-28 14:24:53.789-05	SV2112220587	2021-12-21 19:00:00-05	f	347-671-1338	500	loads into cyberpower diagnostsics but gets stuck\r\npass:\r\ncell: 347-671-1338\r\nnever backed  up. declined dbu\r\nno av. declined eset\r\n$40 for diagnostics\r\n3-5 days for repairs\r\nke: fpolorovira	665-SD	QNTech	\N	sinshiqaq	CUST20122610720	service_order	Custom Build Desktop	"X" - Diagnostic and Repair/Installation Service
SV2112280294@@1	Technician Assigned	2021-12-28 14:24:42.053-05	2021-12-28 14:39:53.498-05	SV2112280294	2021-12-27 19:00:00-05	f	SH4TDQ5Z8PN5T	200	Symptom: Boots up slowly, when set to sleep it will turn off on its own, and popups about storage.\r\nPassword: Wedding2020!\r\nApproved Services (Price): 3 yr accidental warranty\r\nDate of Last Backup: nothing important\r\nCurrent Security: none / declined\r\nCondition: mild wear\r\nCell (Text OK?): 718-737-4917\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	145-2133183-1-1	sinshiqaq	CUST1505220600	service_order	**IMAC27_M20_I5/8/256/530	"P" - Service Plan Contract Coverage
SV2112270167@@1	Received in Shop - Unassigned	2021-12-28 14:40:03.609-05	2021-12-28 14:40:10.815-05	SV2112270167	2021-12-26 19:00:00-05	f	DTBF3AA003051001A84800	101	computer doesnt save customer's password. they need to reset it everytime. the ethernet and wifi doesnt work either.\r\nwants to set password if possible: 1945Chantara\r\ncell: 347-924-7058\r\nnever backed up. declined dbu\r\nno av. declined eset\r\nunder man. warranty\r\n3-5 days for diagnostics\r\nke: fpolorovira	665-SD	QNTech	145-2183451-3-1	\N	CUST1412021681	service_order	**TC875-UR13_10400/8/512H	"W" - Manufacturer's Warranty Repair
SV2112280038@@1	Waiting for product	2021-12-28 14:24:39.964-05	2021-12-28 14:39:53.119-05	SV2112280038	2021-12-27 19:00:00-05	f	5cg023644n	100	Symptom: severe damage to right back hinge and back cover\r\nPassword: 3414\r\nApproved Services (Price): Gen Diag ($39.99 + Tax)\r\nDate of Last Backup: unknown / will contact if needed\r\nCurrent Security: unknown\r\nCondition: heavy physical damage\r\nCell (Text OK?): 917-420-6151\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	\N	\N	service_order	HP_laptop	"X" - Diagnostic and Repair/Installation Service
SV2112270668@@1	Stat 4 - Waiting on customer approval/response	2021-12-28 14:40:13.226-05	2021-12-28 14:40:15.248-05	SV2112270668	2021-12-26 19:00:00-05	f	FVFF125RQ05H	208	Symptom: Lines on screen when turned on\r\nPassword: Denise0524\r\nApproved Services (Price): Apple Limited Warranty\r\nDate of Last Backup: never / declined\r\nCurrent Security: none / declined\r\nCondition: few scratches / bottom of screen damaged \r\nCell (Text OK?): 718-249-3684\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: ASantisteban	665-SD	QNTech	\N	sinshiqaq	\N	service_order	Generic Apple Laptop	"W" - Manufacturer's Warranty Repair
SV2112270147@@1	Received in Shop - Unassigned	2021-12-28 14:39:54.227-05	2021-12-28 14:39:55.095-05	SV2112270147	2021-12-26 19:00:00-05	f	NXHW3AA00102013E6E7600	101	sometimes takes 15-20 tries to turn on pressing the power button.\r\npass: ask if needed\r\ncell: 917-868-6811 \r\nhas backed up to a hard drive recently. also has onedrive. declined dbu\r\nhas eset\r\nhas 3 yr dop plan\r\n3-5 days\r\nke: fpolorovira	665-SD	QNTech	145-1879695-1-1	\N	CUST0712192281636	service_order	**A515R54500U/8/512/15.6H	"P" - Service Plan Contract Coverage
SV2112270175@@1	Received in Shop - Unassigned	2021-12-28 14:40:02.652-05	2021-12-28 14:40:02.848-05	SV2112270175	2021-12-26 19:00:00-05	f	lxpy90203503100f602000	101	Symptom: Does not boot Possible reflash OS\r\nPassword: Ask if necessary\r\nApproved Services (Price): $39.99 + Tax\r\nDate of Last Backup: OCT 1st / declined\r\nCurrent Security: Norton / declined\r\nCondition: mild wear\r\nCell (Text OK?): 646-339-1556\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	\N	CUST1405131888	service_order	Acer Laptop	"X" - Diagnostic and Repair/Installation Service
SV2112270106@@1	Stat 1 - Tech bench; diagnostics in progress	2021-12-28 14:24:45.597-05	2021-12-28 14:39:55.381-05	SV2112270106	2021-12-26 19:00:00-05	f	5CD0404SBB	201	Charger not working, confirmed at bar, rest of unit is okay\r\n347-987-7335\r\nonly charger checked in	665-SD	QNTech	145-2052011-1-1	fpolorovira	CUST17112421721	service_order	**CA040NR_N3350_4/32/14	"W" - Manufacturer's Warranty Repair
SV2112270484@@1	Stat 4 - Waiting on customer approval/response	2021-12-28 14:24:47.835-05	2021-12-28 15:07:00.871-05	SV2112270484	2021-12-26 19:00:00-05	f	FVFZTNY6L40Y	208	Symptom: does not display just shows verticals lines\r\nPassword: audr3ads / audreads\r\nApproved Services (Price): AppleCare +\r\nDate of Last Backup: backup requested $149.99 + Tax\r\nCurrent Security: none / declined\r\nCondition: mild wear\r\nCell (Text OK?): 718-316-7089\r\nDate and Time of Contact: at least 72 business hours for diagnostic result\r\nKE: Asantisteban	665-SD	QNTech	\N	sinshiqaq	CUST1701191557	service_order	Generic Apple Laptop	"W" - Manufacturer's Warranty Repair
SV2112270112@@1	Waiting for product	2021-12-28 14:40:03.243-05	2021-12-28 15:06:59.81-05	SV2112270112	2021-12-26 19:00:00-05	f	G90101082130157	100	Turns on but no display\r\n347-536-1233 (text)\r\nNever backed up,\r\nNo AV\r\napprox 4 days for update	665-SD	QNTech	145-2238886-1-1	\N	CUST2109220620	service_order	G901_5900X/32/2/3080/P/G	"W" - Manufacturer's Warranty Repair
RP2011240139@@1	Invoiced	2021-12-28 16:03:35.069-05	2021-12-28 16:03:35.957-05	RP2011240139	2020-11-23 19:00:00-05	t	C1MN4Z1UDTY3	900	No power\r\n$40 plus tax diagnostics\r\nPhone: 347 459 2575\r\ncondition: wear and tear, tape/labels\r\nKE: achiarelli	665-SD	QNTech	\N	sinshiqaq	CUST2007074123	repair_order	Generic Apple Laptop	"X" - Diagnostic and Repair/Installation Service
\.


--
-- Data for Name: PurchaseRequisitionMaterial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PurchaseRequisitionMaterial" ("createdAt", "updatedAt", "MaterialId", "PurchaseRequisitionId") FROM stdin;
\.


--
-- Data for Name: PurchaseRequisitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PurchaseRequisitions" (id, reference, "vendorRMA", buyer, "originalDocument", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Technicians; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Technicians" (id, name, "createdAt", "updatedAt", access) FROM stdin;
erojas1	Eddie Rojas	2021-12-17 15:10:39.435-05	2021-12-17 15:10:39.435-05	user
tadams1	Travis Adams	2021-12-20 14:36:38.938-05	2021-12-20 14:36:38.938-05	user
vmoses	Vijay Moses	2021-12-20 14:58:55.287-05	2021-12-20 14:58:55.287-05	user
sinshiqaq	Sandor Inshiqaq	2021-12-21 09:22:10.593-05	2021-12-21 09:22:10.593-05	user
fpolorovira	Felipe Polo Rovira	2021-12-21 09:22:10.732-05	2021-12-21 09:22:10.732-05	user
gmanolas1	George Manolas	2021-12-21 09:22:10.918-05	2021-12-21 09:22:10.918-05	user
asantisteban	Alexander Santisteban	2021-12-21 09:22:11.1-05	2021-12-21 09:22:11.1-05	user
mdigier	Morris Digier	2021-12-21 09:22:11.3-05	2021-12-21 09:22:11.3-05	user
pflaherty	Patrick Flaherty	2021-12-24 15:59:15.92-05	2021-12-24 15:59:15.92-05	user
mlim	Manuel Lim	2021-12-24 15:59:16.239-05	2021-12-24 15:59:16.239-05	user
\.


--
-- Name: Audits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Audits_id_seq"', 4, true);


--
-- Name: OrderAudits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderAudits_id_seq"', 273, true);


--
-- Name: Audits Audits_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key" UNIQUE (name);


--
-- Name: Audits Audits_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key1" UNIQUE (name);


--
-- Name: Audits Audits_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key10" UNIQUE (name);


--
-- Name: Audits Audits_name_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key100" UNIQUE (name);


--
-- Name: Audits Audits_name_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key101" UNIQUE (name);


--
-- Name: Audits Audits_name_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key102" UNIQUE (name);


--
-- Name: Audits Audits_name_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key103" UNIQUE (name);


--
-- Name: Audits Audits_name_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key104" UNIQUE (name);


--
-- Name: Audits Audits_name_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key105" UNIQUE (name);


--
-- Name: Audits Audits_name_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key106" UNIQUE (name);


--
-- Name: Audits Audits_name_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key107" UNIQUE (name);


--
-- Name: Audits Audits_name_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key108" UNIQUE (name);


--
-- Name: Audits Audits_name_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key109" UNIQUE (name);


--
-- Name: Audits Audits_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key11" UNIQUE (name);


--
-- Name: Audits Audits_name_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key110" UNIQUE (name);


--
-- Name: Audits Audits_name_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key111" UNIQUE (name);


--
-- Name: Audits Audits_name_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key112" UNIQUE (name);


--
-- Name: Audits Audits_name_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key113" UNIQUE (name);


--
-- Name: Audits Audits_name_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key114" UNIQUE (name);


--
-- Name: Audits Audits_name_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key115" UNIQUE (name);


--
-- Name: Audits Audits_name_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key116" UNIQUE (name);


--
-- Name: Audits Audits_name_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key117" UNIQUE (name);


--
-- Name: Audits Audits_name_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key118" UNIQUE (name);


--
-- Name: Audits Audits_name_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key119" UNIQUE (name);


--
-- Name: Audits Audits_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key12" UNIQUE (name);


--
-- Name: Audits Audits_name_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key120" UNIQUE (name);


--
-- Name: Audits Audits_name_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key121" UNIQUE (name);


--
-- Name: Audits Audits_name_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key122" UNIQUE (name);


--
-- Name: Audits Audits_name_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key123" UNIQUE (name);


--
-- Name: Audits Audits_name_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key124" UNIQUE (name);


--
-- Name: Audits Audits_name_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key125" UNIQUE (name);


--
-- Name: Audits Audits_name_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key126" UNIQUE (name);


--
-- Name: Audits Audits_name_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key127" UNIQUE (name);


--
-- Name: Audits Audits_name_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key128" UNIQUE (name);


--
-- Name: Audits Audits_name_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key129" UNIQUE (name);


--
-- Name: Audits Audits_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key13" UNIQUE (name);


--
-- Name: Audits Audits_name_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key130" UNIQUE (name);


--
-- Name: Audits Audits_name_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key131" UNIQUE (name);


--
-- Name: Audits Audits_name_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key132" UNIQUE (name);


--
-- Name: Audits Audits_name_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key133" UNIQUE (name);


--
-- Name: Audits Audits_name_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key134" UNIQUE (name);


--
-- Name: Audits Audits_name_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key135" UNIQUE (name);


--
-- Name: Audits Audits_name_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key136" UNIQUE (name);


--
-- Name: Audits Audits_name_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key137" UNIQUE (name);


--
-- Name: Audits Audits_name_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key138" UNIQUE (name);


--
-- Name: Audits Audits_name_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key139" UNIQUE (name);


--
-- Name: Audits Audits_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key14" UNIQUE (name);


--
-- Name: Audits Audits_name_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key140" UNIQUE (name);


--
-- Name: Audits Audits_name_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key141" UNIQUE (name);


--
-- Name: Audits Audits_name_key142; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key142" UNIQUE (name);


--
-- Name: Audits Audits_name_key143; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key143" UNIQUE (name);


--
-- Name: Audits Audits_name_key144; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key144" UNIQUE (name);


--
-- Name: Audits Audits_name_key145; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key145" UNIQUE (name);


--
-- Name: Audits Audits_name_key146; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key146" UNIQUE (name);


--
-- Name: Audits Audits_name_key147; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key147" UNIQUE (name);


--
-- Name: Audits Audits_name_key148; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key148" UNIQUE (name);


--
-- Name: Audits Audits_name_key149; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key149" UNIQUE (name);


--
-- Name: Audits Audits_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key15" UNIQUE (name);


--
-- Name: Audits Audits_name_key150; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key150" UNIQUE (name);


--
-- Name: Audits Audits_name_key151; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key151" UNIQUE (name);


--
-- Name: Audits Audits_name_key152; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key152" UNIQUE (name);


--
-- Name: Audits Audits_name_key153; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key153" UNIQUE (name);


--
-- Name: Audits Audits_name_key154; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key154" UNIQUE (name);


--
-- Name: Audits Audits_name_key155; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key155" UNIQUE (name);


--
-- Name: Audits Audits_name_key156; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key156" UNIQUE (name);


--
-- Name: Audits Audits_name_key157; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key157" UNIQUE (name);


--
-- Name: Audits Audits_name_key158; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key158" UNIQUE (name);


--
-- Name: Audits Audits_name_key159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key159" UNIQUE (name);


--
-- Name: Audits Audits_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key16" UNIQUE (name);


--
-- Name: Audits Audits_name_key160; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key160" UNIQUE (name);


--
-- Name: Audits Audits_name_key161; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key161" UNIQUE (name);


--
-- Name: Audits Audits_name_key162; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key162" UNIQUE (name);


--
-- Name: Audits Audits_name_key163; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key163" UNIQUE (name);


--
-- Name: Audits Audits_name_key164; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key164" UNIQUE (name);


--
-- Name: Audits Audits_name_key165; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key165" UNIQUE (name);


--
-- Name: Audits Audits_name_key166; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key166" UNIQUE (name);


--
-- Name: Audits Audits_name_key167; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key167" UNIQUE (name);


--
-- Name: Audits Audits_name_key168; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key168" UNIQUE (name);


--
-- Name: Audits Audits_name_key169; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key169" UNIQUE (name);


--
-- Name: Audits Audits_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key17" UNIQUE (name);


--
-- Name: Audits Audits_name_key170; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key170" UNIQUE (name);


--
-- Name: Audits Audits_name_key171; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key171" UNIQUE (name);


--
-- Name: Audits Audits_name_key172; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key172" UNIQUE (name);


--
-- Name: Audits Audits_name_key173; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key173" UNIQUE (name);


--
-- Name: Audits Audits_name_key174; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key174" UNIQUE (name);


--
-- Name: Audits Audits_name_key175; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key175" UNIQUE (name);


--
-- Name: Audits Audits_name_key176; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key176" UNIQUE (name);


--
-- Name: Audits Audits_name_key177; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key177" UNIQUE (name);


--
-- Name: Audits Audits_name_key178; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key178" UNIQUE (name);


--
-- Name: Audits Audits_name_key179; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key179" UNIQUE (name);


--
-- Name: Audits Audits_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key18" UNIQUE (name);


--
-- Name: Audits Audits_name_key180; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key180" UNIQUE (name);


--
-- Name: Audits Audits_name_key181; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key181" UNIQUE (name);


--
-- Name: Audits Audits_name_key182; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key182" UNIQUE (name);


--
-- Name: Audits Audits_name_key183; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key183" UNIQUE (name);


--
-- Name: Audits Audits_name_key184; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key184" UNIQUE (name);


--
-- Name: Audits Audits_name_key185; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key185" UNIQUE (name);


--
-- Name: Audits Audits_name_key186; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key186" UNIQUE (name);


--
-- Name: Audits Audits_name_key187; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key187" UNIQUE (name);


--
-- Name: Audits Audits_name_key188; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key188" UNIQUE (name);


--
-- Name: Audits Audits_name_key189; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key189" UNIQUE (name);


--
-- Name: Audits Audits_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key19" UNIQUE (name);


--
-- Name: Audits Audits_name_key190; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key190" UNIQUE (name);


--
-- Name: Audits Audits_name_key191; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key191" UNIQUE (name);


--
-- Name: Audits Audits_name_key192; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key192" UNIQUE (name);


--
-- Name: Audits Audits_name_key193; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key193" UNIQUE (name);


--
-- Name: Audits Audits_name_key194; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key194" UNIQUE (name);


--
-- Name: Audits Audits_name_key195; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key195" UNIQUE (name);


--
-- Name: Audits Audits_name_key196; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key196" UNIQUE (name);


--
-- Name: Audits Audits_name_key197; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key197" UNIQUE (name);


--
-- Name: Audits Audits_name_key198; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key198" UNIQUE (name);


--
-- Name: Audits Audits_name_key199; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key199" UNIQUE (name);


--
-- Name: Audits Audits_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key2" UNIQUE (name);


--
-- Name: Audits Audits_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key20" UNIQUE (name);


--
-- Name: Audits Audits_name_key200; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key200" UNIQUE (name);


--
-- Name: Audits Audits_name_key201; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key201" UNIQUE (name);


--
-- Name: Audits Audits_name_key202; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key202" UNIQUE (name);


--
-- Name: Audits Audits_name_key203; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key203" UNIQUE (name);


--
-- Name: Audits Audits_name_key204; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key204" UNIQUE (name);


--
-- Name: Audits Audits_name_key205; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key205" UNIQUE (name);


--
-- Name: Audits Audits_name_key206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key206" UNIQUE (name);


--
-- Name: Audits Audits_name_key207; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key207" UNIQUE (name);


--
-- Name: Audits Audits_name_key208; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key208" UNIQUE (name);


--
-- Name: Audits Audits_name_key209; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key209" UNIQUE (name);


--
-- Name: Audits Audits_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key21" UNIQUE (name);


--
-- Name: Audits Audits_name_key210; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key210" UNIQUE (name);


--
-- Name: Audits Audits_name_key211; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key211" UNIQUE (name);


--
-- Name: Audits Audits_name_key212; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key212" UNIQUE (name);


--
-- Name: Audits Audits_name_key213; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key213" UNIQUE (name);


--
-- Name: Audits Audits_name_key214; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key214" UNIQUE (name);


--
-- Name: Audits Audits_name_key215; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key215" UNIQUE (name);


--
-- Name: Audits Audits_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key22" UNIQUE (name);


--
-- Name: Audits Audits_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key23" UNIQUE (name);


--
-- Name: Audits Audits_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key24" UNIQUE (name);


--
-- Name: Audits Audits_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key25" UNIQUE (name);


--
-- Name: Audits Audits_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key26" UNIQUE (name);


--
-- Name: Audits Audits_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key27" UNIQUE (name);


--
-- Name: Audits Audits_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key28" UNIQUE (name);


--
-- Name: Audits Audits_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key29" UNIQUE (name);


--
-- Name: Audits Audits_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key3" UNIQUE (name);


--
-- Name: Audits Audits_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key30" UNIQUE (name);


--
-- Name: Audits Audits_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key31" UNIQUE (name);


--
-- Name: Audits Audits_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key32" UNIQUE (name);


--
-- Name: Audits Audits_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key33" UNIQUE (name);


--
-- Name: Audits Audits_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key34" UNIQUE (name);


--
-- Name: Audits Audits_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key35" UNIQUE (name);


--
-- Name: Audits Audits_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key36" UNIQUE (name);


--
-- Name: Audits Audits_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key37" UNIQUE (name);


--
-- Name: Audits Audits_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key38" UNIQUE (name);


--
-- Name: Audits Audits_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key39" UNIQUE (name);


--
-- Name: Audits Audits_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key4" UNIQUE (name);


--
-- Name: Audits Audits_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key40" UNIQUE (name);


--
-- Name: Audits Audits_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key41" UNIQUE (name);


--
-- Name: Audits Audits_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key42" UNIQUE (name);


--
-- Name: Audits Audits_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key43" UNIQUE (name);


--
-- Name: Audits Audits_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key44" UNIQUE (name);


--
-- Name: Audits Audits_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key45" UNIQUE (name);


--
-- Name: Audits Audits_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key46" UNIQUE (name);


--
-- Name: Audits Audits_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key47" UNIQUE (name);


--
-- Name: Audits Audits_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key48" UNIQUE (name);


--
-- Name: Audits Audits_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key49" UNIQUE (name);


--
-- Name: Audits Audits_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key5" UNIQUE (name);


--
-- Name: Audits Audits_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key50" UNIQUE (name);


--
-- Name: Audits Audits_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key51" UNIQUE (name);


--
-- Name: Audits Audits_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key52" UNIQUE (name);


--
-- Name: Audits Audits_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key53" UNIQUE (name);


--
-- Name: Audits Audits_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key54" UNIQUE (name);


--
-- Name: Audits Audits_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key55" UNIQUE (name);


--
-- Name: Audits Audits_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key56" UNIQUE (name);


--
-- Name: Audits Audits_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key57" UNIQUE (name);


--
-- Name: Audits Audits_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key58" UNIQUE (name);


--
-- Name: Audits Audits_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key59" UNIQUE (name);


--
-- Name: Audits Audits_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key6" UNIQUE (name);


--
-- Name: Audits Audits_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key60" UNIQUE (name);


--
-- Name: Audits Audits_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key61" UNIQUE (name);


--
-- Name: Audits Audits_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key62" UNIQUE (name);


--
-- Name: Audits Audits_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key63" UNIQUE (name);


--
-- Name: Audits Audits_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key64" UNIQUE (name);


--
-- Name: Audits Audits_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key65" UNIQUE (name);


--
-- Name: Audits Audits_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key66" UNIQUE (name);


--
-- Name: Audits Audits_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key67" UNIQUE (name);


--
-- Name: Audits Audits_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key68" UNIQUE (name);


--
-- Name: Audits Audits_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key69" UNIQUE (name);


--
-- Name: Audits Audits_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key7" UNIQUE (name);


--
-- Name: Audits Audits_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key70" UNIQUE (name);


--
-- Name: Audits Audits_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key71" UNIQUE (name);


--
-- Name: Audits Audits_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key72" UNIQUE (name);


--
-- Name: Audits Audits_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key73" UNIQUE (name);


--
-- Name: Audits Audits_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key74" UNIQUE (name);


--
-- Name: Audits Audits_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key75" UNIQUE (name);


--
-- Name: Audits Audits_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key76" UNIQUE (name);


--
-- Name: Audits Audits_name_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key77" UNIQUE (name);


--
-- Name: Audits Audits_name_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key78" UNIQUE (name);


--
-- Name: Audits Audits_name_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key79" UNIQUE (name);


--
-- Name: Audits Audits_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key8" UNIQUE (name);


--
-- Name: Audits Audits_name_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key80" UNIQUE (name);


--
-- Name: Audits Audits_name_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key81" UNIQUE (name);


--
-- Name: Audits Audits_name_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key82" UNIQUE (name);


--
-- Name: Audits Audits_name_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key83" UNIQUE (name);


--
-- Name: Audits Audits_name_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key84" UNIQUE (name);


--
-- Name: Audits Audits_name_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key85" UNIQUE (name);


--
-- Name: Audits Audits_name_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key86" UNIQUE (name);


--
-- Name: Audits Audits_name_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key87" UNIQUE (name);


--
-- Name: Audits Audits_name_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key88" UNIQUE (name);


--
-- Name: Audits Audits_name_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key89" UNIQUE (name);


--
-- Name: Audits Audits_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key9" UNIQUE (name);


--
-- Name: Audits Audits_name_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key90" UNIQUE (name);


--
-- Name: Audits Audits_name_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key91" UNIQUE (name);


--
-- Name: Audits Audits_name_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key92" UNIQUE (name);


--
-- Name: Audits Audits_name_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key93" UNIQUE (name);


--
-- Name: Audits Audits_name_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key94" UNIQUE (name);


--
-- Name: Audits Audits_name_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key95" UNIQUE (name);


--
-- Name: Audits Audits_name_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key96" UNIQUE (name);


--
-- Name: Audits Audits_name_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key97" UNIQUE (name);


--
-- Name: Audits Audits_name_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key98" UNIQUE (name);


--
-- Name: Audits Audits_name_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_name_key99" UNIQUE (name);


--
-- Name: Audits Audits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_pkey" PRIMARY KEY (id);


--
-- Name: Customers Customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers"
    ADD CONSTRAINT "Customers_pkey" PRIMARY KEY (id);


--
-- Name: Interactions Interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interactions"
    ADD CONSTRAINT "Interactions_pkey" PRIMARY KEY (id);


--
-- Name: Materials Materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Materials"
    ADD CONSTRAINT "Materials_pkey" PRIMARY KEY (id);


--
-- Name: OrderAudits OrderAudits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderAudits"
    ADD CONSTRAINT "OrderAudits_pkey" PRIMARY KEY (id);


--
-- Name: OrderMaterial OrderMaterial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderMaterial"
    ADD CONSTRAINT "OrderMaterial_pkey" PRIMARY KEY ("MaterialId", "OrderId");


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: PurchaseRequisitionMaterial PurchaseRequisitionMaterial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequisitionMaterial"
    ADD CONSTRAINT "PurchaseRequisitionMaterial_pkey" PRIMARY KEY ("MaterialId", "PurchaseRequisitionId");


--
-- Name: PurchaseRequisitions PurchaseRequisitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequisitions"
    ADD CONSTRAINT "PurchaseRequisitions_pkey" PRIMARY KEY (id);


--
-- Name: Technicians Technicians_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Technicians"
    ADD CONSTRAINT "Technicians_pkey" PRIMARY KEY (id);


--
-- Name: Audits Audits_technician_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audits"
    ADD CONSTRAINT "Audits_technician_id_fkey" FOREIGN KEY (technician_id) REFERENCES public."Technicians"(id) DEFERRABLE;


--
-- Name: Interactions Interactions_OrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interactions"
    ADD CONSTRAINT "Interactions_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Interactions Interactions_TechnicianId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interactions"
    ADD CONSTRAINT "Interactions_TechnicianId_fkey" FOREIGN KEY ("TechnicianId") REFERENCES public."Technicians"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: OrderAudits OrderAudits_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderAudits"
    ADD CONSTRAINT "OrderAudits_name_fkey" FOREIGN KEY (name) REFERENCES public."Audits"(name) DEFERRABLE;


--
-- Name: OrderMaterial OrderMaterial_MaterialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderMaterial"
    ADD CONSTRAINT "OrderMaterial_MaterialId_fkey" FOREIGN KEY ("MaterialId") REFERENCES public."Materials"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderMaterial OrderMaterial_OrderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderMaterial"
    ADD CONSTRAINT "OrderMaterial_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES public."Orders"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Orders Orders_CustomerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Orders Orders_TechnicianId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_TechnicianId_fkey" FOREIGN KEY ("TechnicianId") REFERENCES public."Technicians"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PurchaseRequisitionMaterial PurchaseRequisitionMaterial_MaterialId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequisitionMaterial"
    ADD CONSTRAINT "PurchaseRequisitionMaterial_MaterialId_fkey" FOREIGN KEY ("MaterialId") REFERENCES public."Materials"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PurchaseRequisitionMaterial PurchaseRequisitionMaterial_PurchaseRequisitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PurchaseRequisitionMaterial"
    ADD CONSTRAINT "PurchaseRequisitionMaterial_PurchaseRequisitionId_fkey" FOREIGN KEY ("PurchaseRequisitionId") REFERENCES public."PurchaseRequisitions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
