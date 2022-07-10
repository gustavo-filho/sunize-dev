// import { Container } from './box-affiliate.styles';
// import { FaEllipsisV, FaUser } from 'react-icons/fa';
// import { format, parseISO } from 'date-fns';
// import { useMemo, useState } from 'react';
// import { AiOutlineCheckSquare } from 'react-icons/ai';
// import { BiTrash } from 'react-icons/bi';
// import { EditComissionModal } from '@domain/dashboard/affiliates/components/edit-comission-modal/edit-comission-modal.component';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Paper,
// } from '@mui/material';
// import Draggable from 'react-draggable';
// import { Button } from 'antd';

// interface Props {
//   affiliate: any;
//   deleteAffiliate?: (affiliateId: any) => void;
//   approveAffiliate?: (affiliateId: any) => void;
//   canApproveOrDeny?: boolean;
// }
// function PaperComponent(props: any) {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }
// export const BoxAffiliate = ({
//   affiliate,
//   deleteAffiliate,
//   approveAffiliate,
//   canApproveOrDeny = false,
// }: Props) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
//   const [openApproveModa, setOpenApproveModal] = useState<boolean>(false);

//   function toggleModal() {
//     setIsModalVisible(!isModalVisible);
//   }

//   const handleCloseDeleteModal = (id = '') => {
//     // @ts-ignore
//     if (id) deleteAffiliate(id);
//     setOpenDeleteModal(false);
//   };

//   const handleClickOpenApproveModal = () => {
//     setOpenApproveModal(true);
//   };

//   const handleClickOpenDeleteModal = () => {
//     setOpenDeleteModal(true);
//   };

//   const sinceDateFormated = useMemo(() => {
//     const dateUnformated = parseISO(affiliate.updatedAt);

//     return format(dateUnformated, 'dd/MM/yyyy');
//   }, [affiliate.updatedAt]);

//   const handleApprove = () => {
//     handleClickOpenApproveModal();
//   };
//   const handleDelete = () => {
//     handleClickOpenDeleteModal();
//   };

//   const handleCloseApproveModal = (id = '') => {
//     if (approveAffiliate) if (id) approveAffiliate(id);
//     setOpenApproveModal(false);
//   };

//   return (
//     <Container>
//       <main>
//         {affiliate.affiliate.photo ? (
//           <img src={affiliate.affiliate.photo} alt={affiliate.affiliate.name} />
//         ) : (
//           <h3>
//             <FaUser />
//           </h3>
//         )}

//         <div>
//           <strong>{affiliate.affiliate.name}</strong>

//           <p>Desde {sinceDateFormated}</p>
//         </div>
//       </main>

//       <footer>
//         <div onClick={toggleModal}>
//           <FaEllipsisV size={18} className="button" />
//         </div>
//         {canApproveOrDeny && (
//           <div onClick={handleApprove}>
//             <AiOutlineCheckSquare />
//           </div>
//         )}
//         <div onClick={handleDelete}>
//           <BiTrash />
//         </div>
//       </footer>
//       <EditComissionModal
//         toggleModal={toggleModal}
//         affiliate={affiliate}
//         isModalVisible={isModalVisible}
//       />
//       <Dialog
//         open={openDeleteModal}
//         onClose={() => handleCloseDeleteModal()}
//         PaperComponent={PaperComponent}
//         aria-labelledby="draggable-dialog-title"
//         className="dialog"
//       >
//         <DialogTitle style={{ color: '#818181' }} id="draggable-dialog-title">
//           Deletar Afiliado
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Tem certeza que deseja excluir esse afiliado do produto selecionado?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => handleCloseDeleteModal()}
//             color="green"
//             className="buttonModal"
//           >
//             Cancelar
//           </Button>
//           <Button
//             onClick={() => handleCloseDeleteModal(affiliate.id)}
//             color="primary"
//           >
//             Deletar
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {canApproveOrDeny && (
//         <Dialog
//           open={openApproveModa}
//           onClose={() => handleCloseApproveModal()}
//           PaperComponent={PaperComponent}
//           aria-labelledby="draggable-dialog-title"
//           className="dialog"
//         >
//           <DialogTitle style={{ color: '#818181' }} id="draggable-dialog-title">
//             Aprovar afiliado
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Tem certeza que deseja aprovar esse afiliado ao produto
//               selecionado?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => handleCloseApproveModal()}
//               color="green"
//               className="buttonModal"
//             >
//               Cancelar
//             </Button>
//             <Button
//               onClick={() => handleCloseApproveModal(affiliate.id)}
//               color="primary"
//             >
//               Aprovar
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

export const teste = ''