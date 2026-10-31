# dsh-worth-check · Verificação de valor antes de começar

Um plugin do DeepSeek que, no início de cada conversa, avalia o tamanho da tarefa e só pergunta «vale a pena fazer isso?» para projetos grandes, evitando começar trabalhos dos quais você não consegue sair com facilidade.

## O que faz

Em cada conversa, seja qual for o modo, o modelo avalia a tarefa:

- **Tarefas pequenas** (bate-papo, consultas, explicações, erros de digitação) → faça sem interromper.
- **Projetos grandes** → pergunte primeiro «vale a pena fazer agora?» e continue após a resposta.

Sinais de «projeto grande»: requer documento de transferência, muitas compactações de contexto, muitos arquivos/passos, ou implica «projeto / sistema / do zero».

Apenas lembra, nunca bloqueia.

## Configuração

O plugin é dividido em dois componentes que você pode ativar ou desativar na página de detalhes do plugin, em «Componentes incluídos»:

| Componente | Valor | Função |
|---|---|---|
| Verificação de valor | ativado | Avalia o tamanho, pergunta apenas em projetos grandes |
| Verificação de «necessidade falsa» | desativado | Verificação extra de «necessidade falsa», desativada por padrão |

## Instalação

> Ainda não publicado no npm — use as opções abaixo por enquanto.

**Opção 1: `.tgz` local (funciona hoje)**

1. Baixe `dsh-worth-check-*.tgz` de [GitHub Releases](https://github.com/planetpai/dsh-worth-check/releases), ou empacote localmente:
   ```bash
   node scripts/pack.mjs   # gera dsh-worth-check-<version>.tgz
   ```
2. GUI: **Plugins → Adicionar plugin** → escolha o arquivo `.tgz`.

**Opção 2: npm (uma vez publicado)**

```bash
dsh plugin --profile <seu-profile> add dsh-worth-check
```

## Licença

MIT
