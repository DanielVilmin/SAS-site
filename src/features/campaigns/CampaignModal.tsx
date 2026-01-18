import { useState } from 'react';
import styled from 'styled-components';
import { X, Upload, Calendar, FileText, Image as ImageIcon } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.95rem;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: #999;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #f9f9f9;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  input[type="file"] {
    display: none;
  }
`;

const UploadIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const UploadText = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.95rem;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: #dc3545;
    transform: scale(1.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: ${({ $variant, theme }) =>
    $variant === 'secondary' ? '#6c757d' : theme.colors.primary};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin: 0;
  padding: 0.5rem;
  background: #f8d7da;
  border-radius: 4px;
  border-left: 4px solid #dc3545;
`;

interface Props {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    date: string;
    description: string;
    image: string;
  }) => void;
}

export default function CampaignModal({ onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
      setImageFile(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    if (!date) {
      setError('A data é obrigatória');
      return;
    }

    if (!description.trim()) {
      setError('A descrição é obrigatória');
      return;
    }

    if (!imagePreview) {
      setError('A imagem é obrigatória');
      return;
    }

    // Enviar dados
    onSubmit({
      title: title.trim(),
      date,
      description: description.trim(),
      image: imagePreview
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Nova Campanha</Title>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>
              <ImageIcon />
              Imagem da Campanha
            </Label>

            {!imagePreview ? (
              <>
                <ImageUploadArea onClick={() => document.getElementById('imageFile')?.click()}>
                  <UploadIcon>
                    <Upload size={24} />
                  </UploadIcon>
                  <UploadText>
                    <strong>Clique para fazer upload</strong> ou arraste a imagem
                  </UploadText>
                  <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </ImageUploadArea>

                <div style={{ textAlign: 'center', margin: '1rem 0', color: '#999' }}>
                  ou
                </div>

                <Input
                  type="url"
                  placeholder="Cole o URL da imagem aqui"
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                />
              </>
            ) : (
              <ImagePreview>
                <img src={imagePreview} alt="Preview" />
                <RemoveImageButton onClick={removeImage} type="button">
                  <X size={20} />
                </RemoveImageButton>
              </ImagePreview>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              <Calendar />
              Data
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FileText />
              Título da Campanha
            </Label>
            <Input
              type="text"
              placeholder="Ex: Voluntariado CROA - Canil Municipal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FileText />
              Descrição
            </Label>
            <TextArea
              placeholder="Descreva a campanha de voluntariado..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              required
            />
            <small style={{ color: '#999', textAlign: 'right' }}>
              {description.length}/500 caracteres
            </small>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" $variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" $variant="primary">
              <Upload size={18} />
              Criar Campanha
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
}