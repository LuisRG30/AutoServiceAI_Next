import * as React from "react";

import dayjs from "dayjs";

import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";

import useAxios from "../../utils/useAxios";

import UserContext from "../../context/UserContext";

import { ProtectedRoute } from "../../utils/RouteProtection";

import { DocumentType } from "../../types";
import Div100vh from "react-div-100vh";


const Documents: NextPageWithLayout = () => {
    ProtectedRoute();

    const { axios, initialized } = useAxios({});
    const router = useRouter();
    const { conversation } = router.query;

    const { profile } = React.useContext(UserContext);

    const [documents, setDocuments] = React.useState<DocumentType[]>([]);

    React.useEffect(() => {
        const getDocuments = async () => {
            try {
                const response = await axios.get("/documents", {
                    params: {
                        conversation: conversation,
                    },
                });
                setDocuments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (initialized) getDocuments();
    }, [axios, initialized, conversation]);

    const handleDownload = (document: DocumentType) => {
        if (document.file) {
            window.open(document.file, "_blank");
        }
    };


    return (
        <Div100vh>
            <div className={`flex flex-col items-center justify-center w-full mt-10 overflow-y`}>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Requerimiento</th>
                            <th>Última Modificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document: DocumentType) => (
                            <tr key={document.id}>
                                <td className={`text-center`}>{document.name}</td>
                                <td className={`text-center`}>{document.requirement}</td>
                                <td className={`text-center`}>{dayjs(document.updated_at).format(
                                    "DD/MM/YYYY"
                                )}</td>
                                <td className={`text-center`}>
                                    {
                                        document.file && (
                                            <button onClick={() => handleDownload(document)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full`}>Descargar</button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </Div100vh>
    )
};

export default Documents;