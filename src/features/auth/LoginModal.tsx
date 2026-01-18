import { useState } from 'react';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function LoginModal({ onClose, onSuccess }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        /*
          ?? Firebase Authentication
          Aqui o colega deve implementar:
          signInWithEmailAndPassword(auth, email, password)
    
          Depois:
          onSuccess()
        */

        if (email === 'admin@ipca.pt' && password === 'admin123') {
            onSuccess();
        } else {
            alert('Credenciais inválidas');
        }
    }

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Login Administrador</h2>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <input value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Entrar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
}
