appModule.factory("ordemServicoService", function($http, properties) {
    
    // OBJETO COMPARTILHADO

    var _ordemServicoObj;

    var setOrdemServicoObj = function(object) {
        _ordemServicoObj = object;
    } 

    var getOrdemServicoObj = function() {
        return _ordemServicoObj;
    }

    var _getItemById = function(idItem) {
        var itens = getOrdemServicoObj().itens;
        var itemObj;

        itens.forEach(item => {
            if(item.id == idItem){
                itemObj = item;
            }
        });

        return itemObj;
    }

    var _setItem = function(newItem) {
        var ordem = getOrdemServicoObj()
        var itens = ordem.itens;

        for(let i = 0; i < itens.length; i++){
            if(itens[i].id === newItem.id){
                itens[i] = newItem;
            }
        }
        
        console.log(newItem);
        console.log(itens);

        ordem.itens = itens;
        setOrdemServicoObj(ordem);
    }

    // OPERACOES NO BANCO
    
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

    var _insertOrdemServico = function(ordemServico) {
        return $http.post(properties.baseUrl + "/ordensservico", ordemServico);
    }

    var _updateOrdemServico = function(ordemServicoDTO) {
        console.log(ordemServicoDTO)
        return $http.put(properties.baseUrl + "/ordensservico/" + getOrdemServicoObj().id, ordemServicoDTO);
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
            if(item.equipamento != undefined && item.descricao != undefined && item.descricao != undefined){
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

    //UTILS

    var _getEmptyOrdemServicoDTO = function() {
        return {
            "idCliente": undefined,
            "itens": [] 
        };
    }

    var _getOrdemServicoDTO = function() {
        if(getOrdemServicoObj() != undefined){
            return {
                "idCliente": getOrdemServicoObj().cliente.id,
                "itens": getOrdemServicoObj().itens
            };
        } else {
            return undefined;
        }
        
    }

    var _setStatusColor = function(value) {
        if(value === "EM_ANALISE" || value === "AGUARDANDO_DECISAO" || value === "PENDENTE"){
            return "yellow";
        } else if(value === "CANCELADA" || value === "CANCELADO"){
            return "red"
        } else if(value === "APROVADA" || value === "CONCLUIDA" || value === "PAGO"){
            return "green"
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
        setStatusColor: _setStatusColor,
        setOrdemServicoObj,
        getOrdemServicoObj,
        getItemById: _getItemById,
        setItem: _setItem,
        uploadImage: _uploadImage,
        deleteImage: _deleteImage
    };
});