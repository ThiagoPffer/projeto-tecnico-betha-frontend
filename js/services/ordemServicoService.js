appModule.factory("ordemServicoService", function($http, properties, tokenService) {
    
    // OBJETO COMPARTILHADO

    var _ordemServicoObj;

    var _setOrdemServicoObj = function(object) {
        _ordemServicoObj = object;
    } 

    var _getOrdemServicoObj = function() {
        return _ordemServicoObj;
    }

    // OBJETO COMPARTILHADO > OPERACOES COM ITENS
    
    var _getItemById = function(idItem) {
        var itens = _getOrdemServicoObj().itens;
        var itemObj;

        itens.forEach(item => {
            if(item.id == idItem){
                itemObj = item;
            }
        });

        return itemObj;
    }

    var _setItem = function(newItem) {
        var ordem = _getOrdemServicoObj()
        var itens = ordem.itens;

        for(let i = 0; i < itens.length; i++){
            if(itens[i].id === newItem.id){
                itens[i] = newItem;
            }
        }

        ordem.itens = itens;
        _setOrdemServicoObj(ordem);
    }

    // OBJETO COMPARTILHADO > SITUACAO

    var _getSituacaoOrdemServico = function() {
        return _getOrdemServicoObj().situacao;
    };

    // OPERACOES NO BANCO > IMAGENS
    
    var _deleteImage = function(idOrdem, idItem, idImagem) {
        return $http.delete(properties.baseUrl + "/ordensservico/"+idOrdem+"/itens/"+idItem+"/fotos/"+idImagem);
    }

    var _uploadImage = function(idOrdem, idItem, file) {
        var formData = new FormData();
        formData.append('file', file, file.name);

        return $http.post(properties.baseUrl + "/ordensservico/"+idOrdem+"/itens/"+idItem+"/fotos", formData, {
            headers: {'Content-Type': undefined}
        });
    }

    // OPERACOES NO BANCO > ORDEM DE SERVICO

    var _insertOrdemServico = function(ordemServico) {
        return $http.post(properties.baseUrl + "/ordensservico", ordemServico);
    }

    var _updateOrdemServico = function(ordemServicoDTO) {
        return $http.put(properties.baseUrl + "/ordensservico/" + _getOrdemServicoObj().id, ordemServicoDTO);
    }

    var _getOrdensServico = function(pageId) {
        if(pageId === null || pageId === undefined){
            pageId = 0;
        }
        return $http.get(properties.baseUrl + "/ordensservico/page?page=" + pageId);
    }

    var _getOrdemServicoById = function(id) {
        return $http.get(properties.baseUrl + "/ordensservico/" + id);
    }

    var _updateSituacao = function(idOrdem, situacao) {
        return $http.post(properties.baseUrl + "/ordensservico/" + idOrdem + "/situacoes?token="+tokenService.getToken().slice(7)+"&value=" + situacao);
    }
    
    var _updateEstadoPagamento = function(idOrdem, estadoPagamento) {
        return $http.put(properties.baseUrl + "/ordensservico/" + idOrdem + "/pagamentos?value=" + estadoPagamento);
    }

    // VALIDACOES

    var _isEmailValid = function(searchInput) {
        if(searchInput != undefined && searchInput.email != "" && searchInput.email != undefined){
            return true;
        } else {
            return false
        }
    }

    var _isFormularyValid = function(item) {
        if(item != undefined){
            if(item.equipamento != undefined && item.descricao != undefined && item.avaria != undefined){
                if(item.descricao.length < 25 || item.avaria.length < 15){
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false
        }
    }

    var _isOrdemServicoValid = function(newOrdemServico) {
        if(newOrdemServico != undefined){
            if(newOrdemServico.idCliente != undefined && newOrdemServico.itens != undefined){
                if(newOrdemServico.itens.length != 0){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // UTILS > DTO DE ORDEM DE SERVICO

    var _getEmptyOrdemServicoDTO = function() {
        return {
            "idCliente": undefined,
            "itens": [] 
        };
    }

    var _getOrdemServicoDTO = function() {
        if(_getOrdemServicoObj() != undefined){
            return {
                "idCliente": _getOrdemServicoObj().cliente.id,
                "itens": _getOrdemServicoObj().itens
            };
        } else {
            return undefined;
        }
        
    }

    // UTILS > OUTROS

    var _setColorBasedOnStatus = function(situacao) {
        if(situacao === "EM_ANALISE" || situacao === "AGUARDANDO_DECISAO" || situacao === "PENDENTE"){
            return "yellow";
        } else if(situacao === "CANCELADA" || situacao === "CANCELADO"){
            return "red"
        } else if(situacao === "APROVADA" || situacao === "CONCLUIDA" || situacao === "PAGO"){
            return "green"
        }
    }

    var _canObjectsBeChanged = function() {
        if(_getSituacaoOrdemServico() == "EM_ANALISE"){
            return true;
        } else {
            return false;
        }
    }

    return {
        insertOrdemServico: _insertOrdemServico,
        updateOrdemServico: _updateOrdemServico,
        getOrdensServico: _getOrdensServico,
        getOrdemServicoById: _getOrdemServicoById,
        isEmailValid: _isEmailValid,
        isFormularyValid: _isFormularyValid,
        isOrdemServicoValid: _isOrdemServicoValid,
        getEmptyOrdemServicoDTO: _getEmptyOrdemServicoDTO,
        getOrdemServicoDTO: _getOrdemServicoDTO,
        setColorBasedOnStatus: _setColorBasedOnStatus,
        canObjectsBeChanged: _canObjectsBeChanged,
        setOrdemServicoObj: _setOrdemServicoObj,
        getOrdemServicoObj: _getOrdemServicoObj,
        getSituacaoOrdemServico: _getSituacaoOrdemServico,
        getItemById: _getItemById,
        setItem: _setItem,
        uploadImage: _uploadImage,
        deleteImage: _deleteImage,
        updateSituacao: _updateSituacao,
        updateEstadoPagamento: _updateEstadoPagamento
    };
});