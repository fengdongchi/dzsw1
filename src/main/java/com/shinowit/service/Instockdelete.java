package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
@Service
public class Instockdelete {

    @Resource
    private BaseDAO<TMeInStockInfo> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> inStockDetailsInfodao;

    public boolean instockdelete(String uuid){
        boolean result = false;
        try{
            int i=inStockDetailsInfodao.executeHQL("delete from TMeInStockDetailsInfo where TMeInStockInfoByBillCode.billCode=?",uuid);
            if(i>=0){
                  instockdao.executeHQL("delete from TMeInStockInfo where billCode=?" ,uuid);
                  result = true;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
