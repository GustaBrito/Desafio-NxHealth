import "./ConfirmModal.css";

export default function ConfirmModal({
  aberto,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar
}) {
  if (!aberto) {
    return null;
  }

  return (
    <div className="modal d-block modal-confirmacao" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" onClick={onCancelar}></button>
          </div>
          <div className="modal-body">
            <p>{mensagem}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirmar}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

