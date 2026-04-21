-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/04/2026 às 06:13
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `boundless`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cartoes`
--

CREATE TABLE `cartoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `limite` decimal(10,2) DEFAULT 0.00,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cartoes`
--

INSERT INTO `cartoes` (`id`, `nome`, `limite`, `criado_em`) VALUES
(7, 'teste', 0.00, '2026-04-21 00:07:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contas`
--

CREATE TABLE `contas` (
  `id` int(11) NOT NULL,
  `mes_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor` decimal(10,2) DEFAULT 0.00,
  `pago` tinyint(1) DEFAULT 0,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contas`
--

INSERT INTO `contas` (`id`, `mes_id`, `nome`, `valor`, `pago`, `criado_em`) VALUES
(2, 3, 'fdf', 20.00, 0, '2026-04-20 23:37:34');

-- --------------------------------------------------------

--
-- Estrutura para tabela `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `cartao_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor` decimal(10,2) DEFAULT 0.00,
  `pago` tinyint(1) DEFAULT 0,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `meses`
--

CREATE TABLE `meses` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `orcamento` decimal(10,2) DEFAULT 0.00,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `meses`
--

INSERT INTO `meses` (`id`, `nome`, `orcamento`, `criado_em`) VALUES
(1, 'Abril', 30.00, '2026-04-20 23:14:32'),
(3, 'Fevereiro', 500.00, '2026-04-20 23:37:23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `metas`
--

CREATE TABLE `metas` (
  `id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `concluida` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `metas`
--

INSERT INTO `metas` (`id`, `texto`, `concluida`) VALUES
(7, 'adsasd', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `notas`
--

INSERT INTO `notas` (`id`, `texto`, `criado_em`) VALUES
(4, 'comprar a comida da amora', '2026-04-20 16:17:18'),
(5, 'tetse', '2026-04-20 18:04:47'),
(6, 'teste', '2026-04-20 18:12:27'),
(8, 'sczc', '2026-04-20 21:13:49'),
(9, 'oi', '2026-04-20 22:07:21');

-- --------------------------------------------------------

--
-- Estrutura para tabela `objetivos`
--

CREATE TABLE `objetivos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `postits`
--

CREATE TABLE `postits` (
  `id` int(11) NOT NULL,
  `texto` text DEFAULT NULL,
  `pos_x` float DEFAULT NULL,
  `pos_y` float DEFAULT NULL,
  `cor` varchar(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `projetos`
--

CREATE TABLE `projetos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cartoes`
--
ALTER TABLE `cartoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `contas`
--
ALTER TABLE `contas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mes_id` (`mes_id`);

--
-- Índices de tabela `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartao_id` (`cartao_id`);

--
-- Índices de tabela `meses`
--
ALTER TABLE `meses`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `postits`
--
ALTER TABLE `postits`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cartoes`
--
ALTER TABLE `cartoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `contas`
--
ALTER TABLE `contas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `meses`
--
ALTER TABLE `meses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `metas`
--
ALTER TABLE `metas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `postits`
--
ALTER TABLE `postits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `projetos`
--
ALTER TABLE `projetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `contas`
--
ALTER TABLE `contas`
  ADD CONSTRAINT `contas_ibfk_1` FOREIGN KEY (`mes_id`) REFERENCES `meses` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `gastos_ibfk_1` FOREIGN KEY (`cartao_id`) REFERENCES `cartoes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
