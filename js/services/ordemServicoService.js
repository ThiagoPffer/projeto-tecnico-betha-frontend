appModule.factory("ordemServicoService", function($http, properties) {
    
    // OBJETO COMPARTILHADO

    var _ordemServicoObj;

    var setOrdemServicoObj = function(object) {
        _ordemServicoObj = object;
        console.log(_ordemServicoObj);
    } 

    var getOrdemServicoObj = function() {
        return _ordemServicoObj;
    } 

    // OPERACOES NO BANCO
    
    var _insertOrdemServico = function(ordemServico) {
        return $http.post(properties.baseUrl + "/ordensservico", ordemServico);
    }

    var _getOrdensServico = function(pageId) {
        if(pageId === null || pageId === undefined){
            pageId = 0;
        }
        return $http.get(properties.baseUrl + "/ordensservico/page?page=" + pageId);
    }

    var _getOneOrdemServico = function(id) {
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

    var _getNewOrdemServico = function() {
        return {
            "idCliente": undefined,
            "itens": [] 
        };
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
        getOrdensServico: _getOrdensServico,
        getOneOrdemServico: _getOneOrdemServico,
        isEmailValid: _isEmailValid,
        isFormularyValid: _isFormularyValid,
        isOrdemServicoValid: _isOrdemServicoValid,
        getNewOrdemServico: _getNewOrdemServico,
        setStatusColor: _setStatusColor,
        setOrdemServicoObj,
        getOrdemServicoObj
    };
});