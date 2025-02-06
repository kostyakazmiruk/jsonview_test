"use client"
import JsonViewer from "@/components/JsonViewer";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const BASE_URL = 'https://ronin-stand-api.cosmonova-broadcast.tv';
const data = {"_http": "get(ronin/app/resources)", "_recognized": "get(ronin/app/resources)", "_status": 200, "_took": "0.045", "_auth": {"_flow": 100, "_message": "Authenticated session", "_user": "ronin/user/admins/2c4015c8-12fe-432e-8d3b-18dc153704a9", "_name": "user1", "_leave": "ronin/auth/leave"}, "_meta": {"_capsule": "_collection_resources", "_name": "Application Resources", "_manifest": "icon:list", "_self": "ronin/app/resources", "_lift": "ronin/root"}, "_filters_applied": null, "_filters": [{"_alias": "title.master", "_caption": "Primary", "_hint": "Primary", "_type": "bool", "_applied": false, "_options": [{"_value": "False", "_caption": "False", "_count": 0, "_selected": false}, {"_value": "True", "_caption": "True", "_count": 8, "_selected": false}]}, {"_alias": "title.master_reference", "_caption": "Master reference", "_hint": "Master reference", "_type": "ref", "_applied": false, "_options": [{"_value": "ronin/acl/access_domains", "_link": "ronin/acl/access_domains", "_resource": "ronin/acl/access_domains", "_caption": "Access domain", "_manifest": "icon:access_domains", "_count": 1, "_selected": false}, {"_value": "ronin/acl/permissions", "_link": "ronin/acl/permissions", "_resource": "ronin/acl/permissions", "_caption": "Permissions", "_manifest": "icon:permissions", "_count": 1, "_selected": false}, {"_value": "ronin/acl/roles", "_link": "ronin/acl/roles", "_resource": "ronin/acl/roles", "_caption": "Roles", "_manifest": "icon:roles", "_count": 1, "_selected": false}, {"_value": "ronin/admin/applications", "_link": "ronin/admin/applications", "_resource": "ronin/admin/applications", "_caption": "Applications", "_manifest": "icon:applications", "_count": 1, "_selected": false}, {"_value": "ronin/module/application_modules", "_link": "ronin/module/application_modules", "_resource": "ronin/module/application_modules", "_caption": "Application Module", "_manifest": "icon:modules", "_count": 1, "_selected": false}, {"_value": "ronin/module/client_modules", "_link": "ronin/module/client_modules", "_resource": "ronin/module/client_modules", "_caption": "Client Module", "_manifest": "icon:modules", "_count": 1, "_selected": false}, {"_value": "ronin/user/admins", "_link": "ronin/user/admins", "_resource": "ronin/user/admins", "_caption": "Administrators", "_manifest": "icon:admins", "_count": 1, "_selected": false}, {"_value": "ronin/user/users", "_link": "ronin/user/users", "_resource": "ronin/user/users", "_caption": "Users", "_manifest": "user_icon", "_count": 1, "_selected": false}]}, {"_alias": "title.berth", "_caption": "Berth", "_hint": "Berth", "_type": "enum", "_applied": false, "_options": [{"_value": "graph", "_caption": "Graph berth", "_count": 0, "_selected": false}, {"_value": "sql", "_caption": "SQL berth", "_count": 8, "_selected": false}, {"_value": "file", "_caption": "File Berth", "_count": 0, "_selected": false}, {"_value": "service", "_caption": "System Berth", "_count": 0, "_selected": false}, {"_value": "geo", "_caption": "Geo Berth", "_count": 0, "_selected": false}, {"_value": "stages", "_caption": "NoSQL Only Berth", "_count": 0, "_selected": false}]}, {"_alias": "title.origin", "_caption": "Origin", "_hint": "Origin", "_type": "enum", "_applied": false, "_options": [{"_value": "class_origin", "_caption": "Created from YAML", "_count": 8, "_selected": false}, {"_value": "yaml_origin", "_caption": "Created from Class", "_count": 0, "_selected": false}]}, {"_alias": "title.realm", "_caption": "Realm", "_hint": "Realm", "_type": "str", "_applied": false, "_options": [{"_value": "acl", "_count": 3, "_selected": false}, {"_value": "admin", "_count": 1, "_selected": false}, {"_value": "module", "_count": 2, "_selected": false}, {"_value": "user", "_count": 2, "_selected": false}]}, {"_alias": "_owner", "_caption": "Owner", "_hint": "Person who created and/or currently is responsible for a given record", "_type": "ref", "_applied": false, "_options": [{"_value": "ronin/user/admins/__boilerplate__", "_name": "Boilerplate User", "_id": "ronin/user/admins/__boilerplate__", "_link": "ronin/user/admins/__boilerplate__", "_resource": "ronin/user/admins", "_caption": "Administrators", "_manifest": "icon:admins", "_count": 8, "_selected": false}]}, {"_alias": "_date_created", "_caption": "Date Created", "_hint": "Date when original record was created", "_type": "date", "_applied": false, "_capacity": "seconds", "_takes_omitted": false, "_available_range": {"_min": "2024-10-25T11:07:19+03:00", "_max": "2024-10-25T11:07:33+03:00"}, "_counts": {"_count": 8}}, {"_alias": "_editor", "_caption": "Last Editor", "_hint": "Person who modified the record last", "_type": "ref", "_applied": false, "_options": [{"_value": "ronin/user/admins/__boilerplate__", "_name": "Boilerplate User", "_id": "ronin/user/admins/__boilerplate__", "_link": "ronin/user/admins/__boilerplate__", "_resource": "ronin/user/admins", "_caption": "Administrators", "_manifest": "icon:admins", "_count": 8, "_selected": false}, {"_value": "_omitted", "_count": 0, "_selected": false, "_caption": "Omitted"}]}, {"_alias": "_date_modified", "_caption": "Date Edited", "_hint": "Date when given record was modified last time", "_type": "date", "_applied": false, "_capacity": "seconds", "_takes_omitted": true, "_omitted_applied": false, "_available_range": {"_min": "2024-10-25T11:07:19+03:00", "_max": "2024-10-25T11:07:33+03:00"}, "_counts": {"_count": 8, "_count_omitted": 0}}, {"_alias": "_retired", "_caption": "Retired", "_hint": "Shows objects that were moved to archive", "_type": "bool", "_applied": false, "_options": [{"_value": "active", "_caption": "Active", "_count": 0, "_selected": true}, {"_value": "retired", "_caption": "Retired", "_count": 0, "_selected": false}]}], "_sorts_applied": null, "_sort": [{"_alias": "title.caption", "_caption": "Caption", "_hint": "Caption", "_type": "str", "_applied": false}, {"_alias": "_date_created", "_caption": "Date Created", "_hint": "Date when original record was created", "_type": "date", "_applied": false, "_capacity": "seconds"}], "_found": 8, "_resources": [{"_enumerate": 0, "_resource": "ronin/admin/applications", "_caption": "Applications", "_manifest": "icon:applications", "_link": "ronin/admin/applications", "_primary": true}, {"_enumerate": 1, "_resource": "ronin/acl/access_domains", "_caption": "Access domain", "_manifest": "icon:access_domains", "_link": "ronin/acl/access_domains", "_primary": true}, {"_enumerate": 2, "_resource": "ronin/acl/permissions", "_caption": "Permissions", "_manifest": "icon:permissions", "_link": "ronin/acl/permissions", "_primary": true}, {"_enumerate": 3, "_resource": "ronin/acl/roles", "_caption": "Roles", "_manifest": "icon:roles", "_link": "ronin/acl/roles", "_primary": true}, {"_enumerate": 4, "_resource": "ronin/user/admins", "_caption": "Administrators", "_manifest": "icon:admins", "_link": "ronin/user/admins", "_primary": true}, {"_enumerate": 5, "_resource": "ronin/user/users", "_caption": "Users", "_manifest": "user_icon", "_link": "ronin/user/users", "_primary": true}, {"_enumerate": 6, "_resource": "ronin/module/application_modules", "_caption": "Application Module", "_manifest": "icon:modules", "_link": "ronin/module/application_modules", "_primary": true}, {"_enumerate": 7, "_resource": "ronin/module/client_modules", "_caption": "Client Module", "_manifest": "icon:modules", "_link": "ronin/module/client_modules", "_primary": true}]}

type JsonDataType = typeof data;

const JsonViewerWithData = () => {
    const [jsonData, setJsonData] = useState<JsonDataType | null>(null);
    const searchParams = useSearchParams();
    const path = searchParams.get('path');

    useEffect(() => {
        const fetchData = async () => {
            if (path) {
                try {
                    const response = await fetch(`${BASE_URL}/${path}`);
                    const newData = await response.json();
                    setJsonData(newData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setJsonData(data);
                }
            } else {
                setJsonData(data);
            }
        };

        fetchData();
    }, [path]);

    return <JsonViewer data={jsonData || data} />;
};

const Page = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <JsonViewerWithData />
            </Suspense>
        </div>
    );
};

export default Page;